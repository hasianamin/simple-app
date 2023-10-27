const paginateService = (data, page, limit, total, baseUrl) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const result = {
    data,
    pageInfo: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  };

  if (hasNextPage) {
    result.pageInfo.nextPage = `${baseUrl}?page=${page + 1}&limit=${limit}`;
  }

  if (hasPreviousPage) {
    result.pageInfo.previousPage = `${baseUrl}?page=${page - 1}&limit=${limit}`;
  }

  return result;
};

export default paginateService;
