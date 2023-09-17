import React from "react";
import { Link } from "react-router-dom";

export default function LinkCellRenderer({ data, value }) {
    return (
        <Link to={`/Employee?cafe=${data.name}`}>{value}</Link>
    );
}
