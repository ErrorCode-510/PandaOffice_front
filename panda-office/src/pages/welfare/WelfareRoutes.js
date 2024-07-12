
/*설문 자동패밍 + 대시보드 자동매핑 */
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import Dashboard from "../../components/welfare/Dashboard";
import SurveyRegination from "../../components/welfare/SurveyRegistration";
import SurveyProgress from "../../components/welfare/SurveyProgress";
import { useState, useEffect } from "react";
import { authRequest } from '../../apis/api';

function WelfareRoutes() {
    return (
        <Routes>
            <Route path="dashboard" element={<DashboardWrapper />} />
            <Route path="surveyregination" element={<SurveyRegination />} />
            <Route path="surveyprogress" element={<SurveyProgressWrapper />} />
            <Route path="surveyprogress/:surveyId" element={<SurveyProgressWrapper />} />
        </Routes>
    );
}


function DashboardWrapper() {
    const navigate = useNavigate();
    const [activeSurveyId, setActiveSurveyId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchActiveSurvey = async () => {
            try {
                let response = await authRequest.get('/survey/active');
                if (response.data && response.data.id) {
                    setActiveSurveyId(response.data.id);
                } else {
                    console.error('No active survey found in the response, checking for the most recent ended survey');
                    response = await authRequest.get('/survey/most-recent-ended');
                    if (response.data && response.data.id) {
                        setActiveSurveyId(response.data.id);
                    } else {
                        console.error('No recent ended survey found in the response');
                    }
                }
            } catch (err) {
                console.error('Failed to fetch active or recent ended survey:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchActiveSurvey();
    }, []);

    if (isLoading) {
        return <div>Loading survey...</div>;
    }

    if (!activeSurveyId) {
        return <div>등록된 설문이 없습니다.</div>;
    }

    return <Dashboard surveyId={activeSurveyId} />;
}



function SurveyProgressWrapper() {
    const { surveyId } = useParams();
    const navigate = useNavigate();
    const [activeSurveyId, setActiveSurveyId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchActiveSurvey = async () => {
            try {
                const response = await authRequest.get('/survey/active');
                if (response.data && response.data.id) {
                    setActiveSurveyId(response.data.id);
                    if (!surveyId) {
                        navigate(`/welfare/surveyprogress/${response.data.id}`); //주소 자동 매핑
                    }
                } else {
                    console.error('No active survey found in the response');
                }
            } catch (err) {
                console.error('Failed to fetch active survey:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (!surveyId) {
            fetchActiveSurvey();
        } else {
            setActiveSurveyId(surveyId);
            setIsLoading(false);
        }
    }, [surveyId, navigate]);

    if (isLoading) {
        return <div>Loading active survey...</div>;
    }

    if (!activeSurveyId) {
        return <div>등록된 설문이 없습니다.</div>;
    }

    return <SurveyProgress surveyId={activeSurveyId} />;
}

export default WelfareRoutes;


