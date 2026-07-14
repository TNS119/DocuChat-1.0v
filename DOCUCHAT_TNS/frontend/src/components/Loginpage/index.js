import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { buildApiUrl } from '../../api';
import {
    OuterContainer,
    InnerContainer,
    Card,
    Heading,
    SubHeading,
    Field,
    Label,
    Input,
    Button,
    ErrorText,
    LinkText
} from './styledComponents';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(buildApiUrl('/auth/login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok || !data?.success) {
                throw new Error(data?.message || 'Login failed');
            }

            navigate('/', { replace: true });
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <OuterContainer>
            <InnerContainer onSubmit={handleSubmit}>
                <Card>
                    <Heading>Welcome back</Heading>
                    <SubHeading>Sign in to continue with your PDF chats</SubHeading>

                    <Field>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </Field>

                    <ErrorText>{error || ' '}</ErrorText>

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Login'}
                    </Button>

                    <LinkText>
                        New here? <Link to="/register" style={{ color: '#7dd3fc' }}>Create an account</Link>
                    </LinkText>
                </Card>
            </InnerContainer>
        </OuterContainer>
    );
};

export default LoginPage;