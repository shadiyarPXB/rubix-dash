import React from 'react';
import { useTable, usePagination } from 'react-table';
import cx from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
interface CustomTableProps {
    columns: unknown[];
    data: unknown[];
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination,
    );

    const classes = useStyles();
    return (
        <>
            <div className={classes.tableWrapper}>
                <Table {...getTableProps()} className={classes.table}>
                    <TableHead>
                        {headerGroups.map((headerGroup, index) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                                {headerGroup.headers.map((column, index) => (
                                    <TableCell
                                        className={classes.tableHeadCell}
                                        {...column.getHeaderProps()}
                                        key={index}
                                    >
                                        {column.render('Header')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <React.Fragment key={i}>
                                    <TableRow className={classes.blankRow} />
                                    <TableRow {...row.getRowProps()}>
                                        {row.cells.map((cell, i) => {
                                            return (
                                                <TableCell
                                                    key={i}
                                                    className={classes.tableBodyCell}
                                                    {...cell.getCellProps()}
                                                >
                                                    {cell.render('Cell')}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </React.Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
            <div className={classes.pagination}>
                <button className={classes.paginationItem} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    First
                </button>
                <button className={classes.paginationItem} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <ArrowBackIosIcon />
                </button>
                <span className={classes.paginationItem}>
                    Page
                    <strong style={{ marginLeft: '5px' }}>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <button className={classes.paginationItem} onClick={() => nextPage()} disabled={!canNextPage}>
                    <ArrowForwardIosIcon />
                </button>
                <button
                    className={classes.paginationItem}
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    Last
                </button>

                {/* <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '100px' }}
                    />
                </span>  */}
                <select
                    className={cx(classes.paginationItem, classes.selectSize)}
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default CustomTable;

const useStyles = makeStyles((theme) => ({
    tableWrapper: { overflowX: 'auto' },
    table: {
        fontFamily: 'roc-grotesk, sans-serif',
    },
    tableHeadCell: {
        color: '#f1faee' + ' !important',
        borderBottom: '2px solid #fff',
        fontWeight: 400,
        paddingBottom: '1px',
        '&:last-child': { textAlign: 'right' },
        fontFamily: 'roc-grotesk, sans-serif',
        fontSize: theme.typography.pxToRem(12),
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(14),
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: theme.typography.pxToRem(14),
        },
    },
    blankRow: {
        height: '5px',
        [theme.breakpoints.up('md')]: {
            height: '10px',
        },
        [theme.breakpoints.up('lg')]: {
            height: '15px',
        },
        [theme.breakpoints.up('lg')]: {
            height: '20px',
        },
    },
    tableBodyCell: {
        backgroundColor: '#6c63ac',
        borderTop: '10px solid transparent',
        padding: '5px 7px',
        '&:last-child': { textAlign: 'right' },
        border: 'none',
        color: '#fff',
        fontFamily: 't26-carbon, monospace',
        fontSize: theme.typography.pxToRem(12),
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(15),
            padding: '10px 8px',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: theme.typography.pxToRem(16),
            padding: '15px 10px',
        },
    },
    pagination: {
        margin: '-3px',
        marginTop: '30px',
        display: 'flex',
        flexWrap: 'wrap',

        justifyContent: 'center',
        '& button, & select': {
            cursor: 'pointer',
            transition: '0.3s',
            outline: 'none',
            color: theme.palette.common.white,
            backgroundColor: '#0e0e0e',
        },
        '& button:hover, & select:hover': {
            backgroundColor: '#232323',
            color: theme.palette.common.white,
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-end',
        },
    },
    paginationItem: {
        backgroundColor: '#0e0e0e',
        color: '#fff',
        border: 'none',
        minHeight: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3px',
        padding: '5px 15px',
        borderRadius: '5px',
        fontFamily: 'roc-grotesk, sans-serif',
        [theme.breakpoints.down('sm')]: { fontSize: theme.typography.pxToRem(8), padding: '5px 8px' },
    },
    selectSize: {
        [theme.breakpoints.down('md')]: { width: '100%' },
    },
}));
