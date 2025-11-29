import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Template, Title } from '../components/Template';

export default function Login({ themeUse }) {
    const { user, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    return (
        <Template height="100%">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh'
            }}>
                <Title color={themeUse?.primary}>Login</Title>
                <button
                    onClick={login}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: themeUse?.primary || '#000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    Sign in with Google
                </button>
            </div>
        </Template>
    );
}
