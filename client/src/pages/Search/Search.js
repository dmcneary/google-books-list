import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import GOOG_API from "../../utils/GOOG_API"
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Search extends Component {
    state = {
        search: "",
        results: []
    };

    saveBook = (id) => {
        const book = this.state.results.find(book => book.id === id);
        console.log(book);
        const bookData = {
            googleId: book.id,
            title: book.volumeInfo.title,
            url: book.volumeInfo.infoLink,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageUrl: book.volumeInfo.imageLinks.thumbnail
        };
        console.log("Saving book: ");
        console.table(bookData);
        API.saveBook({ bookData })
            .catch(err => console.log(err));
      }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.search) {
            GOOG_API.submitQuery(this.state.search)
                .then(res => {
                    this.setState({
                        results: res.data.items
                    })
                }).catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="xs-12 md-4">
                        <Jumbotron>
                            <h1>Search for your favorite books!</h1>
                        </Jumbotron>
                        <form>
                            <Input
                                value={this.state.search}
                                onChange={this.handleInputChange}
                                name="search"
                                placeholder="Search..."
                            />
                            <FormBtn disabled={!(this.state.search)} onClick={this.handleFormSubmit}>
                                Search
                            </FormBtn>
                        </form>
                    </Col>
                    <Col size="xs-12 md-8">
                        <Jumbotron>
                            <h1>Results:</h1>
                        </Jumbotron>
                        {this.state.results.length ? (
                            <List>
                                {this.state.results.map((book, i) => (
                                    <ListItem key={book.id}>
                                        {(book.volumeInfo.imageLinks.thumbnail !== undefined) ?
                                        (<img src={book.volumeInfo.imageLinks.thumbnail} alt="Book cover" />) :
                                        (<img src="../../nav-icon.jpg" alt="Missing cover" />)}
                                        <Link to={book.volumeInfo.infoLink}>
                                            <strong>
                                                {book.volumeInfo.title} by {book.volumeInfo.authors}
                                            </strong>
                                        </Link>
                                        <p>{book.description}</p>
                                        { console.log(i) }
                                        <button onClick={() => this.saveBook(book.id)}>Save to list</button>
                                    </ListItem>                
                                ))}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Search;