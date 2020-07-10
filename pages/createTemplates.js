import { useState } from 'react';
import CreateTemplate from '../components/createTemplate';
import MainContainer from '../components/mainContainer';

export default function Home() {

    const [loading, setLoading] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('success')
    const showAlert = (severity, message) => {
        setAlertVisible(true)
        setAlertMessage(message)
        setAlertSeverity(severity)
    }



    return <MainContainer loading={loading} alertVisible={alertVisible} alertMessage={alertMessage} alertSeverity={alertSeverity} onCloseAlert={() => setAlertVisible(false)}>
        <CreateTemplate showAlert={showAlert} setLoading={setLoading} />
    </MainContainer>

}
