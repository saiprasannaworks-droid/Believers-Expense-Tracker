import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>

      <p className="text-sm font-medium text-gray-900 dark:text-white">{content}</p>
        <div className=" flex justify-end mt-6">
          <button
          className="add-btn add-btn-fill"
          type="button"
          onClick={onDelete}
          >
            Delete
          </button>
        </div>
    </div>
  )
}

export default DeleteAlert