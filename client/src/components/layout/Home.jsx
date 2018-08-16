import React, {Component} from 'react';
import {Container, Grid, Button, Header} from 'semantic-ui-react';

class Home extends Component {
    render() {
        return (
            <Container fluid className="main-container">
                <Grid className="home__inner">
                    <Grid.Row centered columns={1}>
                        <Header as='h1' textAlign='center' className="header__custom">React Network</Header>
                        <Header as='h3' textAlign='center' className="header__custom">Create a profile/portfolio, share
                            posts and get help from other developers</Header>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            <Button basic size='large' color='orange' floated='right' className="home__button">
                                Register
                            </Button>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button basic size='large' color='orange' floated='left' className="home__button">
                                Login
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Home;