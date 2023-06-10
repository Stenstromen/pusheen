import React from "react";
import { Family } from "../Family";

function All() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#fbf0e3",
        height: "100vh",
      }}
    >
      <h1>The Whole Family 😸</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {Family.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>
                  <a style={{
                    color: "red",
                  }} href={`/${item.id}`}>{item.name} --&gt;</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default All;
