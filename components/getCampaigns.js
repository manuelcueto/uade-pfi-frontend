import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { Paper, FormControl, TableRow, TableCell, Input, Button, TableContainer, Table, TableHead, TableBody, ButtonGroup, InputAdornment } from '@material-ui/core';
import ConfirmDialog from './confirmDialog';



export default function GetCampaigns(props) {

    const [campaigns, setCampaigns] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [sampleModalOpen, setSampleModalOpen] = useState(false)
    const [startModalOpen, setStartModalOpen] = useState(false)
    const [percentage, _setPercentage] = useState(0)
    const [selectedCampaign, setSelectedCampaign] = useState({})

    useEffect(() => {
        let fetch = axios.get("http://localhost:9999/api/campaigns").then(response => {
            setCampaigns(response.data)
        })
    }, [])

    const setPercentage = ev => _setPercentage(ev.target.value)

    const handleClose = (ev) => { setModalOpen(false) }
    const handleOpen = (campaign) => {
        setModalOpen(true)
        setSelectedCampaign(campaign)
    }
    const deleteCampaign = () => {
        console.log("boom") //not implemented in backend
    }



    const handleCloseSample = (ev) => { setSampleModalOpen(false) }
    const handleSampleOpen = (campaign) => {
        setSampleModalOpen(true)
        setSelectedCampaign(campaign)
    }
    const sampleCampaign = (alertCallback) => {
        axios.post("http://localhost:9999/api/campaigns/" + selectedCampaign.id + "/startSampling/" + percentage).then(
            succ => {
                props.showAlert("success", "éxito!")
            },
            err => {
                props.showAlert("error", "Error Al Samplear la Campaña")
                handleCloseSample()
            }
        )
    }

    const handleCloseStart = (ev) => { setStartModalOpen(false) }
    const handleStartOpen = (campaign) => {
        setStartModalOpen(true)
        setSelectedCampaign(campaign)
    }
    const startCampaign = () => {
        axios.post("http://localhost:9999/api/campaigns" + selectedCampaign.id + "/startFullCampaign").then(
            succ => {
                props.showAlert("success", "éxito!")
            },
            err => {
                props.showAlert("error", "Error Al Comenzart la Campaña")
                handleCloseSample()
            }
        )
    }




    const rows = (statusText, extraAction) => {
        return [
            <TableCell>{statusText}</TableCell>,
            <TableCell align='right'>
                <ButtonGroup>
                    {extraAction}
                    <Button onClick={ev => handleOpen(campaign)}><DeleteIcon color='secondary' /></Button>
                </ButtonGroup>
            </TableCell>]
    }

    const statusAndAction = (campaign) => {
        switch (campaign.status) {
            case "Started": {
                return rows("Creada", <Button onClick={ev => handleSampleOpen(campaign)} variant="contained" color="secondary">Samplear</Button>)
                break;
            }
            case "Sampling": {
                return rows("Sampleando")
                break;
            }
            case "Running": {
                return rows("Activa")
                break;
            }
            case "Sampled": {
                return rows("Sampleo Completo", <Button onClick={ev => handleStartOpen(campaign)} variant="contained" color="primary">Comenzar</Button>)
                break;
            }
        }
    }
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell align='right'>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {campaigns.map(campaign => {
                            return <TableRow key={campaign.id}>
                                <TableCell>{campaign.id}</TableCell>
                                <TableCell>{campaign.name}</TableCell>
                                {statusAndAction(campaign)}
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmDialog
                onOpen={modalOpen}
                onClose={handleClose}
                titleText='Confirmar Acción'
                contentText={'Estás seguro que deseas eliminar la Campaña ' + selectedCampaign.name + '?'}
                onCancel={handleClose}
                onConfirm={deleteCampaign}
                confirmText='Eliminar' />
            <ConfirmDialog
                onOpen={startModalOpen}
                onClose={handleCloseStart}
                titleText='Confirmar Acción'
                contentText={'Estás seguro que deseas eliminar la Campaña ' + selectedCampaign.name + '?'}
                onCancel={handleCloseStart}
                onConfirm={startCampaign}
                confirmText='Eliminar' />
            <ConfirmDialog
                onOpen={sampleModalOpen}
                onClose={handleCloseSample}
                titleText='Confirmar Acción'
                contentText='Que porcentaje de usuarios queres samplear?'
                onCancel={handleCloseSample}
                onConfirm={sampleCampaign}
                confirmText='Confirmar'>
                <FormControl>
                    <Input endAdornment={<InputAdornment position="end">%</InputAdornment>} id="percentage-input" label="Porcentaje" type="number" onChange={setPercentage} />
                </FormControl>
            </ConfirmDialog>
        </div>
    );
}
