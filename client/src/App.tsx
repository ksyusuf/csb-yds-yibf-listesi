import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { Filter, ColumnKey } from './types'; // Tür tanım dosyasından içe aktar
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<ColumnKey[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]); // Güncellenmiş filtre tipi
  // sayfalama için ilgili değişkenler
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Filtreleri query string olarak dönüştür
        const filtersQuery = filters.length > 0 ? `&filters=${encodeURIComponent(JSON.stringify(filters))}` : '';
        const response = await fetch(`http://localhost:3001/api/data?count=10${filtersQuery}&page=${currentPage}&limit=${itemsPerPage}`);
        const result = await response.json();
        setData(result.data);
        setTotalItems(result.total);
        
        // headers ve data'yı al
        setHeaders(result.headers || []);
        setData(result.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters, currentPage, itemsPerPage]); // Filters değiştiğinde veri tekrar çekilir

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Yapı Denetim Sistemi</h1>
      <Table data={data} headers={headers} onFilterChange={setFilters} />
      <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
            />
    </div>
  );
};

export default App;
