import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';
import IncomeFilterBar from '../../components/Filterbar/IncomeFilterBar';


const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // state for filter 
  const [filters, setFilters] = useState({
    source: "",
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    sortBy: "recent",
  });



  // Get All Income Details

  const fetchIncomeDetails = async () => {

    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }

    } catch (error) {
      console.log("Something went wrong. Please try again", error)

    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income Details

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // Validation Checks 

    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than ");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added Successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error Adding Income:",
        error.response?.data?.message || error.message
      );
    }
  };


  // Delete Income Details

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();

    } catch (error) {
      console.error(
        "Error in deleting income",
        error.response?.data?.message || error.message
      );
    }
  };

  // handle download Income Details

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );

      // creating a URL for blob 
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading income details.", error)
      toast.error("Failed to download income details. Please try again.")
    }
  };

  useEffect(() => {
    fetchIncomeDetails()

    return () => {

    }
  }, [])

const filteredIncome = incomeData
  // filter by source (Salary, Freelance, Investments, Others)
  .filter(t => !filters.source || t.source === filters.source)

  // filter by start date
  .filter(t => !filters.startDate || new Date(t.date) >= new Date(filters.startDate))

  // filter by end date
  .filter(t => !filters.endDate || new Date(t.date) <= new Date(filters.endDate))

  // filter by minimum amount
  .filter(t => !filters.minAmount || t.amount >= Number(filters.minAmount))

  // filter by maximum amount
  .filter(t => !filters.maxAmount || t.amount <= Number(filters.maxAmount))

  // sort by amount or date
  .sort((a, b) => {
    if (filters.sortBy === "amount") return b.amount - a.amount;
    return new Date(b.date) - new Date(a.date); // default: recent
  });



  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <IncomeFilterBar filters={filters}
          setFilters={setFilters} />

        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={filteredIncome}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList

            transactions={filteredIncome}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Income Detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>


      </div>
    </DashboardLayout>

  );
};

export default Income