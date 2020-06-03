import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dialog, DialogTitle, DialogContent, DialogActions, Paper, TableRow, TableCell, Button, TableContainer, Table, TableHead, TableBody, DialogContentText } from '@material-ui/core';
import ConfirmDialog from './confirmDialog';



export default function GetTemplates(props) {
    const [templates, _setTemplates] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedTemplate, setSelectedTempate] = useState({})

    useEffect(() => {
        let fetch = axios.get("http://localhost:9999/api/templates").then(response => {
            _setTemplates(response.data)
        })
    }, [])

    const handleClose = (ev) => { setModalOpen(false) }
    const handleOpen = (template) => {
        setModalOpen(true)
        setSelectedTempate(template)
    }

    const deleteTemplate = () => {
        console.log("boom") //not implemented in backend
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Asunto</TableCell>
                            <TableCell>Template</TableCell>
                            <TableCell align='center'>Acción</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {templates.map(tmpl => {
                            return <TableRow key={tmpl.id}>
                                <TableCell>{tmpl.id}</TableCell>
                                <TableCell>{tmpl.name}</TableCell>
                                <TableCell>{tmpl.subject}</TableCell>
                                <TableCell>{tmpl.text}</TableCell>
                                <TableCell align='center'><Button onClick={ev => handleOpen(tmpl)}><DeleteIcon color='secondary' /></Button></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmDialog
                onOpen={modalOpen}
                onClose={handleClose}
                titleText='Confirmar Acción'
                contentText={'Estás seguro que deseas eliminar el template ' + selectedTemplate.name + '?'}
                onCancel={handleClose}
                onConfirm={deleteTemplate}
                confirmText='Eliminar' />
        </div>

    )

}