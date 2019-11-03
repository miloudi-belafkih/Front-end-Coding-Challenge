import React, { Component } from 'react';
import styled from 'styled-components'
import Axios from "axios";

const StyledContainer = styled.div`
  padding:0;
  margin:0;
  padding-left:5px;
`
const StyledItem = styled.div`
    height:100px;
    margin-bottom:20px;
`
const StyledImg = styled.img`
    height: 100px;
    width: 100px;
    display:inline-block;
    vertical-align:top;
`
const StyledItemContent = styled.div`
    display:inline-block;
    vertical-align:top;
    height:100%;
    margin-left:20px;
    width:85%;
`
const StyledTitle = styled.h3`
    margin:0;
`
const StyledDesc = styled.p`
  margin:0;
  margin-top:10px;
  height: 20px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const StyledInfosContainer = styled.div`

`

const StyledStars = styled.p`
  border: 2px solid #000;
  padding:5px;
  display:inline-block;
  vertical-align:top;
`
const StyledIssues = styled.p`
  border: 2px solid #000;
  padding:5px;
  display:inline-block;
  vertical-align:top;
  margin-left:13px;
`
const StyledDelay = styled.p`
  display:inline-block;
  vertical-align:top;
  margin-left:13px;
  margin-top:22px;
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  async componentDidMount() {
    const response = await Axios.get("https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc");
    console.log(response.data.items);
    this.setState({ items: response.data.items })

  }

  render() {
    return (
      <StyledContainer>
        {
          this.state.items.length != 0 && this.state.items.map((item) => {
            const date = new Date(item.created_at);
            const date2 = new Date("2017-10-22");
            const diffTime = Math.abs(date - date2);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return (
              <StyledItem>
                <StyledImg src={item.owner.avatar_url} />
                <StyledItemContent>
                  <StyledTitle>{item.full_name}</StyledTitle>
                  <StyledDesc>{item.description}</StyledDesc>
                  <StyledInfosContainer>
                    <StyledStars>{"Stars: " + (item.stargazers_count / 1000) + "k"}</StyledStars>
                    <StyledIssues>{"Issues: " + item.open_issues_count + "k"}</StyledIssues>
                    <StyledDelay>{"Submitted "+diffDays+" days ago by "+item.owner.login}</StyledDelay>
                  </StyledInfosContainer>
                </StyledItemContent>
              </StyledItem>
            );
          })
        }
      </StyledContainer>
    );
  }
}

export default App;