import { useParams, Navigate } from 'react-router'
import { PRIVACY_DATA } from '../../data/privacyData'
import PrivacyPage from '../../components/privacy/PrivacyPage'

export default function Privacy() {
  const { appId } = useParams<{ appId: string }>()
  const data = appId ? PRIVACY_DATA[appId] : undefined
  if (!data) return <Navigate to="/" replace />
  return <PrivacyPage data={data} />
}
