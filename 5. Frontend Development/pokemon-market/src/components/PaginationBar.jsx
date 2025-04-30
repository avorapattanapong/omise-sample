import { Pagination } from 'antd';

function PaginationBar({ currentPage, totalCards, onPageChange }) {
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <Pagination
        current={currentPage}
        total={totalCards}
        pageSize={20}
        onChange={(page) => onPageChange(page)}
        showSizeChanger={false}
      />
    </div>
  );
}

export default PaginationBar;
