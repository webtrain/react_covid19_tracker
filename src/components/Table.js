import React from 'react';

const Table = ({ countries }) => {
  return (
    <div className="table">
      <table>
        <thead></thead>
        <tbody>
          {countries.map(({ country, cases }) => (
            <tr key={country}>
              <td>{country}</td>
              <td>
                <strong>{cases.toLocaleString()}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
