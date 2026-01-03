import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';
import ExpenseFilterBar from '../../components/Filterbar/ExpenseFilterBar';



const Expense = () => {
  useUserAuth();
    const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  // state for filter
  const [filters, setFilters] = useState({
  category: "",
  startDate: "",
  endDate: "",
  minAmount: "",
  maxAmount: "",
  sortBy: "recent",
});


  // Get All Expense Details

  const fetchExpenseDetails =async()=>{

    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if(response.data){
        setExpenseData(response.data);
      }

    }catch(error){
      console.log("Something went wrong. Please try again", error)

    } finally{
      setLoading(false);
    }
  };

  // Handle Add Expense Details

  const handleAddExpense =async(expense)=>{
    const {category, amount, date, icon} = expense;

    // Validation Checks 

    if(!category.trim()){
      toast.error("Category is required.");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <=0){
      toast.error("Amount should be a valid number greater than ");
      return;
    }

    if(!date){
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added Successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error Adding Expense:",
        error.response?.data?.message || error.message
      ); 
    }
  };

    // Delete Expense Details

  const deleteExpense =async(id)=>{
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show:false,data:null});
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
      
    } catch (error) {
      console.error(
        "Error in deleting Expense",
        error.response?.data?.message|| error.message
      );
    }
  };

  // handle download Expense Details

  const handleDownloadExpenseDetails =async()=>{
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      // creating a URL for blob 
      const url = window.URL.createObjectURL( new Blob ([response.data]));
      const link= document.createElement("a");
      link.href= url;
      link.setAttribute("download","expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error downloading expense details.", error)
      toast.error("Failed to download expense details. Please try again.")
    }
  };



  useEffect(() => {
    fetchExpenseDetails()
    return () => {
    }
  }, [])

 const filteredExpenses = expenseData
  .filter(t => !filters.category || t.category === filters.category)
  .filter(t => !filters.startDate || new Date(t.date) >= new Date(filters.startDate))
  .filter(t => !filters.endDate || new Date(t.date) <= new Date(filters.endDate))
  .filter(t => !filters.minAmount || t.amount >= Number(filters.minAmount))
  .filter(t => !filters.maxAmount || t.amount <= Number(filters.maxAmount))
  .sort((a, b) => {
    if (filters.sortBy === "amount") return b.amount - a.amount;
    return new Date(b.date) - new Date(a.date); // default: recent
  });

  

  return (
        <DashboardLayout activeMenu="Expense">
        <div className="my-5 mx-auto">
          <ExpenseFilterBar filters={filters} setFilters={setFilters} />

          <div className=" grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
            transactions={filteredExpenses}
            onExpenseIncome={()=> setOpenAddExpenseModal(true)}
            />

          </div>
          <ExpenseList
            transactions={filteredExpenses}
            onDelete={(id)=>{
              setOpenDeleteAlert({show:true, data:id})
            }}
            onDownload={handleDownloadExpenseDetails}

          />
          </div>
          <Modal
            isOpen={openAddExpenseModal}
            onClose={()=>setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddExpenseForm onAddExpense={handleAddExpense} >
            </AddExpenseForm>
          </Modal>

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={()=>setOpenDeleteAlert({show:false, data:null})}
            title="Delete Expense"
            >
            <DeleteAlert
              content="Are you sure you want to delete this Expense Detail?"
              onDelete={()=>deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
        </DashboardLayout>
  )
}

export default Expense