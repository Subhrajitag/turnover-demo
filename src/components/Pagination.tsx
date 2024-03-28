import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '~/hooks/usePagination';
interface Props {
  onPageChange: (page: number) => void,
  totalCount: number | undefined,
  currentPage: number,
  pageSize: number,
  className: string
}

const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    currentPage,
    pageSize,
    className
  } = props;


  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  let lastPage;
  if (paginationRange) {
    lastPage = paginationRange[paginationRange.length - 1];
  }
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className='flex gap-3'>
          <div className="arrow left">
          </div><div className='flex'>
            <div className="arrow left">
            </div>
            <div className="arrow left">
            </div>
          </div>
        </div>      </li>
      {paginationRange?.map((pageNumber: string | number) => {

        if (pageNumber === DOTS) {
          return <li className="pagination-item dots" key={pageNumber}>&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber == currentPage
            })}
            key={pageNumber}
            onClick={() => onPageChange(+pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className='flex gap-3'>
          <div className="arrow right">
          </div><div className='flex'>
            <div className="arrow right">
            </div>
            <div className="arrow right">
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Pagination;