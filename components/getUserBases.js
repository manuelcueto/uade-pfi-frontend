import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { Paper, TableRow, TableCell, Button, ButtonGroup, TableContainer, Table, TableHead, TableBody } from '@material-ui/core';
import ConfirmDialog from './confirmDialog';



export default function GetUserBases() {

    const [bases, setBases] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedBase, setSelectedBase] = useState({})

    useEffect(() => {
        let fetch = axios.get("http://localhost:9999/api/userBases").then(response => {
            setBases(response.data)
        })
    }, [])

    const deleteUserBase = () => {
        console.log("boom") //not implemented in backend
    }

    const handleClose = (ev) => { setModalOpen(false) }
    const handleOpen = (base) => {
        setModalOpen(true)
        setSelectedBase(base)
    }
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Tamaño</TableCell>
                            <TableCell align='center'>Acción</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {bases.map(base => {
                            return <TableRow key={base.id}>
                                <TableCell>{base.id}</TableCell>
                                <TableCell>{base.name}</TableCell>
                                <TableCell>{base.size}</TableCell>
                                <TableCell align='center'>
                                    <ButtonGroup>
                                        <Button onClick={() => Router.push('/createUser/[baseId]', '/createUser/' + base.name)} variant="contained" color="secondary">Agregar usuario</Button>
                                        <Button onClick={ev => handleOpen(base)}><DeleteIcon color='secondary' /></Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmDialog
                onOpen={modalOpen}
                onClose={handleClose}
                titleText='Confirmar Acción'
                contentText={'Estás seguro que deseas eliminar la Base ' + selectedBase.name + '?'}
                onCancel={handleClose}
                onConfirm={deleteUserBase}
                confirmText='Eliminar' />
        </div>
    );
}
