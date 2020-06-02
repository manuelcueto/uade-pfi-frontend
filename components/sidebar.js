import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Drawer, Divider, List, ListItem, ListItemText, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Box } from '@material-ui/core';



const drawerWidth = 290
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    }
}));

export default function NavSidebar() {

    const classes = useStyles()
    return (
        <Drawer className={classes.drawer} variant="permanent" anchor="left">
            <Typography variant="h6" noWrap>Email-marketing</Typography>
            <Divider />
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography>Campañas</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        <ListItem button onClick={() => Router.push('/createCampaign')} key="createCampaigns">
                            <ListItemText primary="crear nueva campaña" />
                        </ListItem>
                        <ListItem button onClick={() => Router.push('/getCampaigns')} key="seeCampaigns">
                            <ListItemText primary="ver campañas" />
                        </ListItem>
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography>Templates</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        <ListItem button onClick={() => Router.push('/createTemplates')} key="createTemplate">
                            <ListItemText primary="crear nuevo template" />
                        </ListItem>
                        <ListItem button onClick={() => Router.push('/getTemplates')} key="seeTemplates">
                            <ListItemText primary="ver templates" />
                        </ListItem>
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography>Usuarios</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        <ListItem button onClick={() => Router.push('/createUserBase')} key="createUserBase">
                            <ListItemText primary="crear nueva base de usuarios" />
                        </ListItem>
                        <ListItem button onClick={() => Router.push('/createUser')} key="createUser">
                            <ListItemText primary="agregar nuevo usuario" />
                        </ListItem>
                        <ListItem button onClick={() => Router.push('/getUserBases')} key="getUserBases">
                            <ListItemText primary="ver bases de usuarios" />
                        </ListItem>
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Divider />
        </Drawer>
    )
};