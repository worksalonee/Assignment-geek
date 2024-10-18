import React, { useEffect, useState, useCallback } from 'react';

function Studentlist() {
  const [slno, setSlno] = useState([]);
  const [name, setName] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  // searchHandler updates search input
  const searchHandler = (event) => {
    setSearch(event.target.value); // Update the search state
  };

  // Function to filter data based on search input
  const filterData = useCallback(() => {
    const results = name.filter((item) =>
      item.state.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(results); // Update the filtered data
  }, [name, search]);

  // Debounce function to delay execution of filterData
  const debounce = (func, delay) => {
    let timeOutId;
    return (...args) => {
      if (timeOutId) clearTimeout(timeOutId); // Clear any previous timeout
      timeOutId = setTimeout(() => {
        func(...args); // Call the function after delay
      }, delay);
    };
  };

  // Use debounce for filtering data
  const debounceFilter = useCallback(debounce(filterData, 400), [filterData]);

  // Apply debounceFilter when the search input changes
  useEffect(() => {
    debounceFilter(); // Trigger filtering with debounce
  }, [search, debounceFilter]);

  // Fetch data from the server when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/get'); // Fetch data from server
        const data = await response.json();
        setName(data); // Set the fetched data to name state
        setFilter(data); // Initialize filter with full data set
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by state"
        value={search} // Bind search input to search state
        onChange={searchHandler} // Handle input change
      />

      <table>
        <thead>
          <tr>
          <th>Sl.no</th>
            <th>Name</th>
            <th>State</th>
            <th>Age</th>
            <th>Courses</th>
          </tr>
        </thead>
        <tbody>
          {filter.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td> 
              <td>{item.name}</td>
              <td>{item.state}</td>
              <td>{item.age}</td>
              <td>{item.courses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Studentlist;
