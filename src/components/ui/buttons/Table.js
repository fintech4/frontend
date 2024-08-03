import React from 'react';

const Table = ({ columns, data }) => (
  <table>
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index}>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {Object.values(row).map((cell, index) => (
            <td key={index}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
