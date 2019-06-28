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

    saveBook = (i) => {
        const bookData = {
            title: this.state.results[i].volumeInfo.title,
            authors: this.state.results[i].volumeInfo.authors,
            description: this.state.results[i].volumeInfo.description,
            imageUrl: this.state.results[i].volumeInfo.imageLinks.thumbnail,
            url: this.state.results[i].volumeInfo.infoLink
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
                        {console.log(this.state)}
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
                                        <button onClick={() => this.saveBook(i)}>Save to list</button>
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