const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
}

const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
}

const nextPage = (currentPage, totalPages, setCurrentPage) => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
}

const prevPage = (currentPage, setCurrentPage) => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
}
const firstPage = (currentPage, setCurrentPage) => {
    if (currentPage > 1) {
        setCurrentPage(1);
    }
}

const lastPage = (currentPage, totalPages, setCurrentPage) => {
    if (currentPage < totalPages) {
        setCurrentPage(totalPages);
    }
}
const limitDisplayedPages = (currentPage, totalPages) => {
    const displayedPages = 3;
    const halfDisplayed = Math.floor(displayedPages / 2);

    let startPage = Math.max(1, currentPage - halfDisplayed);
    let endPage = Math.min(startPage + displayedPages - 1, totalPages);

    if (endPage - startPage + 1 < displayedPages) {
        startPage = Math.max(1, endPage - displayedPages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
};

export { calculateRange, sliceData, nextPage, prevPage, limitDisplayedPages, firstPage, lastPage };


