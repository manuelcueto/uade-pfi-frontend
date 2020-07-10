import NewUser from '../../components/createUser';
import { useState } from 'react';
import { useRouter } from 'next/router'
import MainContainer from '../../components/mainContainer';


export default function Home() {

    const router = useRouter()
    const { baseId } = router.query
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
        <NewUser  base={baseId} loading={loading} showAlert={showAlert} setLoading={setLoading} />
    </MainContainer>
}
