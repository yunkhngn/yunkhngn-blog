import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingCanva from '../Template/Function/LoadingCanva';

const AdminRoute = (WrappedComponent) => {
    return (props) => {
        const { user, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push('/login');
            }
        }, [user, loading, router]);

        if (loading || !user) {
            return <LoadingCanva />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default AdminRoute;
