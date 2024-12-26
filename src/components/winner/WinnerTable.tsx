import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
} from "@mui/material";

const rows = [
  {
    id: 1,
    user: "John",
    lmng: 100,
    winRate: 75,
    roundsWon: 10,
    roundsPlayed: 20,
  },
  {
    id: 2,
    user: "Jane",
    lmng: 200,
    winRate: 50,
    roundsWon: 5,
    roundsPlayed: 10,
  },
  {
    id: 3,
    user: "Bob",
    lmng: 150,
    winRate: 60,
    roundsWon: 12,
    roundsPlayed: 18,
  },
  // Add more data rows here
];

const columns = [
  { id: "id", label: "" }, // Empty label for the first column
  { id: "user", label: "User" },
  { id: "lmng", label: "Net Winnings (LMNG)" },
  { id: "winRate", label: "Win Rate" },
  { id: "roundsWon", label: "Rounds WON" },
  { id: "roundsPlayed", label: "Rounds Played" },
];

const rowsPerPageOptions = [5, 10, 25];

const WinnerTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = [
    {
      id: 1,
      user: "John",
      lmng: 100,
      winRate: 75,
      roundsWon: 10,
      roundsPlayed: 20,
    },
    {
      id: 2,
      user: "Jane",
      lmng: 200,
      winRate: 50,
      roundsWon: 5,
      roundsPlayed: 10,
    },
    {
      id: 3,
      user: "Bob",
      lmng: 150,
      winRate: 60,
      roundsWon: 12,
      roundsPlayed: 18,
    },
    // Add more data rows here
  ];
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          background: "#283573",
        }}
      >
        <Table>
          <TableHead
            sx={{
              background:
                "var(--Background, linear-gradient(177deg, #414593 0%, #00022E 100.23%))",
              backgroundBlendMode: "hard-light",
              "& th": {
                color: "#FFF",
                fontFamily: "Poppins",
                fontSize: "1.22281rem",
                fontWeight: "500",
                "&:first-child": {
                  borderTopLeftRadius: "0.95106rem",
                },
                "&:last-child": {
                  borderTopRightRadius: "0.95106rem",
                },
              },
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index) => (
                <TableRow key={row.id}>
                  <TableCell
                    key={1}
                    sx={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      fontWeight: 600,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        borderRadius: "0.95106rem",
                        height: "4rem",
                        width: "4rem",
                        background:
                          "var(--Background, linear-gradient(177deg, #414593 0%, #00022E 100.23%))",
                        backgroundBlendMode: "hard-light",
                      }}
                    >
                      {/* #{row[column.id]} */} #1
                    </Box>
                  </TableCell>

                  <TableCell
                    key={1}
                    sx={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      fontWeight: 600,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        borderRadius: "0.95106rem",
                        height: "4rem",
                        width: "4rem",
                        background:
                          "var(--Background, linear-gradient(177deg, #414593 0%, #00022E 100.23%))",
                        backgroundBlendMode: "hard-light",
                      }}
                    >
                      {/* #{row[column.id]} */} #1
                    </Box>
                  </TableCell>
                  <TableCell
                    key={1}
                    sx={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      fontWeight: 600,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        borderRadius: "0.95106rem",
                        height: "4rem",
                        width: "4rem",
                        background:
                          "var(--Background, linear-gradient(177deg, #414593 0%, #00022E 100.23%))",
                        backgroundBlendMode: "hard-light",
                      }}
                    >
                      {/* #{row[column.id]} */} #1
                    </Box>
                  </TableCell>
                  <TableCell
                    key={1}
                    sx={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      fontWeight: 600,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        borderRadius: "0.95106rem",
                        height: "4rem",
                        width: "4rem",
                        background:
                          "var(--Background, linear-gradient(177deg, #414593 0%, #00022E 100.23%))",
                        backgroundBlendMode: "hard-light",
                      }}
                    >
                      {/* #{row[column.id]} */} #1
                    </Box>
                  </TableCell>
                  <TableCell
                    key={1}
                    sx={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      fontWeight: 600,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        borderRadius: "0.95106rem",
                        height: "4rem",
                        width: "4rem",
                        background:
                          "var(--Background, linear-gradient(177deg, #414593 0%, #00022E 100.23%))",
                        backgroundBlendMode: "hard-light",
                      }}
                    >
                      {/* #{row[column.id]} */} #1
                    </Box>
                  </TableCell>

                  <TableCell
                    key={1}
                    sx={{
                      color: "white",
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      fontWeight: 600,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        borderRadius: "0.95106rem",
                        height: "4rem",
                        width: "4rem",
                        background:
                          "var(--Background, linear-gradient(177deg, #414593 0%, #00022E 100.23%))",
                        backgroundBlendMode: "hard-light",
                      }}
                    >
                      {/* #{row[column.id]} */} #1
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default WinnerTable;
