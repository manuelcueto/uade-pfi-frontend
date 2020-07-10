import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { Paper, FormControl, TableRow, TableCell,  Button, TableContainer, Table, TableHead, TableBody, ButtonGroup, InputAdornment, TextField } from '@material-ui/core';
import ConfirmDialog from './confirmDialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        minWidth: 900
    },
}));


export default function GetCampaigns({setLoading, loading, showAlert}) {

    const classes = useStyles()
    const [campaigns, setCampaigns] = useState([])
    const [triggerFetch, setTriggerFetch] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [sampleModalOpen, setSampleModalOpen] = useState(false)
    const [startModalOpen, setStartModalOpen] = useState(false)
    const [percentage, setPercentage] = useState(0)
    const [timeLimit, setTimeLimit] = useState(0)
    const [selectedCampaign, setSelectedCampaign] = useState({})

    useEffect(() => {
        let fetch = axios.get("http://localhost:9999/api/campaigns").then(response => {
            setCampaigns(response.data)
        })
    }, [triggerFetch])

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
    const sampleCampaign = () => {
        setLoading(true)
        axios.post("http://localhost:9999/api/campaigns/" + selectedCampaign.id + "/startSampling", { percentage: percentage, limit: timeLimit }).then(
            succ => {
                setLoading(false)
                showAlert("success", "éxito!")
                setTriggerFetch(true)
                handleCloseSample()
            },
            err => {
                setLoading(false)
                showAlert("error", "Error Al Samplear la Campaña")
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
        setLoading(true)
        axios.post("http://localhost:9999/api/campaigns/" + selectedCampaign.id + "/startFullCampaign").then(
            succ => {
                setLoading(false)
                showAlert("success", "éxito!")
                handleCloseSample()
                setTriggerFetch(true)
            },
            err => {
                setLoading(false)
                showAlert("error", "Error Al Comenzar la Campaña")
                handleCloseSample()
            }
        )
    }




    const rows = (statusText, campaign, extraAction) => {
        return [
            <TableCell key={campaign.id + "-status"}>{statusText}</TableCell>,
            <TableCell key={campaign.id + "-actions"} align='right'>
                <ButtonGroup>
                    {extraAction}
                    <Button onClick={ev => handleOpen(campaign)}><DeleteIcon color='secondary' /></Button>
                </ButtonGroup>
            </TableCell>]
    }

    const statusAndAction = (campaign) => {
        switch (campaign.status) {
            case "Started": {
                return rows("Creada", campaign, <Button onClick={ev => handleSampleOpen(campaign)} variant="contained" color="secondary">Samplear</Button>)
                break;
            }
            case "Sampling": {
                return rows("Sampleando", campaign)
                break;
            }
            case "Running": {
                return rows("Activa", campaign)
                break;
            }
            case "Sampled": {
                return rows("Sampleo Completo", campaign, <Button onClick={ev => handleStartOpen(campaign)} variant="contained" color="primary">Comenzar</Button>)
                break;
            }
        }
    }
    return (
        <div>
            <TableContainer className={classes.tableContainer} component={Paper}>
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
                loading={loading}
                confirmText='Eliminar' />
            <ConfirmDialog
                onOpen={startModalOpen}
                onClose={handleCloseStart}
                titleText='Confirmar Acción'
                contentText={'Estás seguro que deseas comenzar la Campaña ' + selectedCampaign.name + '?'}
                onCancel={handleCloseStart}
                onConfirm={startCampaign}
                loading={loading}
                confirmText='Comenzar' />
            <ConfirmDialog
                onOpen={sampleModalOpen}
                onClose={handleCloseSample}
                titleText='Confirmar Acción'
                contentText='Ingresa porcentaje de usuarios a samplear, y un límite de tiempo'
                onCancel={handleCloseSample}
                onConfirm={sampleCampaign}
                loading={loading}
                confirmText='Confirmar'>
                <FormControl>
                    <TextField
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                        id="percentage-input" label="Porcentaje" type="number" onChange={ev => setPercentage(ev.target.value)} />
                    <TextField id="time-limit-input" label="Limite de tiempo" type="number" helperText="en Segundos" onChange={ev => setTimeLimit(ev.target.value)} />
                </FormControl>
            </ConfirmDialog>
        </div>
    );
}
