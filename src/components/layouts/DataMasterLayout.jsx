import ContentWrapper from "../ui/ContentWrapper";
import Card from "../ui/Card";
import PageHeader from "../ui/PageHeader";
import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";
import DataTable from "../ui/DataTable";
import Pagination from "../ui/Pagination";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import useDataMaster from "../../hooks/useDataMaster";

const DataMasterLayout = ({
  // Page configuration
  pageIcon,
  pageTitle,
  pageDescription,
  
  // Statistics cards
  statisticsCards = [],
  
  // Search and filter configuration
  searchPlaceholder = "Cari data...",
  filterOptions = [],
  secondFilterOptions = [],
  filterPlaceholder = "Pilih Filter",
  secondFilterPlaceholder = "Pilih Filter Kedua",
  showFilter = false,
  showSecondFilter = false,
  searchFields = ['name', 'email'],
  filterField = 'role',
  secondFilterField = 'status',
  
  // Button configuration
  showAddButton = true,
  addButtonText = "Tambah Data",
  onAddClick = () => {},
  showSecondButton = false,
  secondButtonText = "Tambah Banyak",
  secondButtonIcon = <FaPlus />,
  secondButtonVariant = "primary",
  onSecondButtonClick = () => {},
  
  // Table configuration
  tableIcon,
  tableTitle,
  columns = [],
  data = [],
  
  // Pagination configuration
  itemsPerPageOptions = [5, 10, 25, 50],
  defaultItemsPerPage = 10,
  
  // Event handlers
  onSearch = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onPageChange = () => {},
  onItemsPerPageChange = () => {}
}) => {
  // Menggunakan useDataMaster hook untuk state management dan data processing
  const {
    search,
    filter,
    secondFilter,
    currentPage,
    itemsPerPage,
    currentData,
    totalPages,
    startIndex,
    showingItems,
    totalItems,
    setSearch,
    setFilter,
    setSecondFilter,
    setCurrentPage,
    setItemsPerPage,
    itemsPerPageOptions: hookItemsPerPageOptions
  } = useDataMaster({
    data,
    searchFields,
    filterField,
    secondFilterField,
    defaultItemsPerPage,
    itemsPerPageOptions
  });

  // Table data dengan actions
  const tableData = currentData.map((item, index) => ({
    ...item,
    no: startIndex + index + 1,
    actions: (
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
          icon={<FaEdit />}
          ariaLabel="Edit Data"
          onClick={() => onEdit(item)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          icon={<FaTrash />}
          ariaLabel="Hapus Data"
          onClick={() => onDelete(item)}
        >
          Hapus
        </Button>
      </div>
    )
  }));

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    onItemsPerPageChange(newItemsPerPage);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  return (
    <>
      <ContentWrapper>
        <div className="space-y-6">
          {/* Judul Halaman */}
          <PageHeader
            icon={pageIcon}
            title={pageTitle}
            description={pageDescription}
          />
          
          {/* Statistics Cards */}
          {statisticsCards.length > 0 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${statisticsCards.length > 3 ? '4' : '3'} gap-6`}>
              {statisticsCards.map((card, index) => (
                <Card
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  value={card.value}
                  label={card.label}
                  compact={card.compact}
                  allowMultiLine={card.allowMultiLine}
                />
              ))}
            </div>
          )}
        </div>
      </ContentWrapper>

      {/* Search Section */}
      <div className="mt-6 sm:mt-8">
        <div className="space-y-3 sm:space-y-4">
          <SearchBar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            filters={filterOptions}
            secondFilter={secondFilter}
            setSecondFilter={setSecondFilter}
            secondFilters={secondFilterOptions}
            placeholder={searchPlaceholder}
            filterPlaceholder={filterPlaceholder}
            secondFilterPlaceholder={secondFilterPlaceholder}
            onSearch={onSearch}
            showFilter={showFilter}
            showSecondFilter={showSecondFilter}
            showAddButton={showAddButton}
            addButtonText={addButtonText}
            onAddClick={onAddClick}
            onSecondButtonClick={onSecondButtonClick}
            showSecondButton={showSecondButton}
            secondButtonText={secondButtonText}
            secondButtonIcon={secondButtonIcon}
            secondButtonVariant={secondButtonVariant}
          />
        </div>
      </div>

      {/* Data Table Section */}
      <div className="mt-6 sm:mt-8">
        <ContentWrapper>
          <div className="space-y-4 sm:space-y-6">
            {/* Table Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                  {tableIcon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800 truncate">
                    {tableTitle}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs sm:text-sm text-slate-600 truncate">
                      Menampilkan {showingItems} dari {totalItems} data
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <DataTable
              columns={columns}
              data={tableData}
              className="mt-6"
            />

            {/* Pagination Controls */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-end">
              {/* Per halaman */}
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-slate-600 whitespace-nowrap">
                  Per halaman:
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white min-w-0"
                >
                  {hookItemsPerPageOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center sm:justify-end">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="scale-90 sm:scale-100"
                  />
                </div>
              )}
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};

export default DataMasterLayout;
