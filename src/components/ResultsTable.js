import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ColsHead(props) {
    const { columns } = props;

    return (
        <TableHead>
            <TableRow>
                {columns.map((headCell) => (
                    <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function ResultsTable(props) {
    const { rows, columns, isRaceResults, rowsPerPage = 5 } = props;

    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    function RaceTableCells(row) {
        return (
            <>
                <TableCell>{row.laps}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.FastestLap?.Time?.time}</TableCell>
                <TableCell>{row.points}</TableCell>
            </>
        );
    }

    function QualyTableCells(row) {
        return (
            <>
                <TableCell>{row.Q1}</TableCell>
                <TableCell>{row.Q2}</TableCell>
                <TableCell>{row.Q3}</TableCell>
            </>
        );
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        size={'small'}>
                        <ColsHead columns={columns} />
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>
                                <TableRow hover key={row.position} tabIndex={-1}>
                                    <TableCell>{row.position}</TableCell>
                                    <TableCell>{`${row.Driver?.givenName} ${row.Driver?.familyName}`}</TableCell>
                                    <TableCell>{row.Constructor?.name}</TableCell>
                                    {isRaceResults ? RaceTableCells(row) : QualyTableCells(row)}
                                </TableRow>
                            )}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (33) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Paper>
        </Box>
    );
}