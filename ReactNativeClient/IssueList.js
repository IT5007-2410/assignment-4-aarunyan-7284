import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
  } from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://192.168.1.81:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <View>
        {/****** Q1: Start Coding here. ******/}
        <Text>Issue List Summary as of 15 Nov</Text>
        {/****** Q1: Code ends here ******/}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
  });

const width= [40,80,80,80,80,80,200];

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    const created = new Date(issue.created).toDateString();
    let due = "";
    if (issue.due) {due = new Date(issue.due).toDateString()}
    else {due = ""}
    
    const rowData = [issue.id, issue.title, issue.status, issue.owner, created, issue.effort, due];
    {/****** Q2: Coding Ends here.******/}
    return (
    <View>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <Row data={rowData} textStyle={styles.text} style={styles.row} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}/>
      {/****** Q2: Coding Ends here. ******/}  
    </View>
    );
  }
  
  
  function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );


    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    const tableHead = ['ID', 'Title', 'Status', 'Owner', 'Created', 'Effort', 'Due'];
    {/****** Q2: Coding Ends here. ******/}
    
    
    return (
    <View style={styles.container}>
    {/****** Q2: Start Coding here to render the table header/rows.**********/}
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}> 
        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
        {issueRows}
      </Table>
      
      
    {/****** Q2: Coding Ends here. ******/}
    </View>
    );
  }

  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Start Coding here. Create State to hold inputs******/
      this.state = { IssueInputs : {title: '', status: '', owner: '', effort: '',  due: '' }};
      this.handleUpdate = this.handleUpdate.bind(this);
      /****** Q3: Code Ends here. ******/
    }

    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleUpdate(input , field) {
      if(field === "title")
      {
        this.setState({ IssueInputs: {
          title: input, 
          status: this.state.IssueInputs.status, 
          owner: this.state.IssueInputs.owner, 
          effort: this.state.IssueInputs.effort, 
          due: this.state.IssueInputs.due}});
          // console.log("Title:", this.state.IssueInputs.title, "Status:", this.state.IssueInputs.status, "Owner:", this.state.IssueInputs.owner, "Effort:", this.state.IssueInputs.effort, "Due:", this.state.IssueInputs.due);
          // console.log("aaa",this.state.IssueInputs);
        }
      else if(field === "status")
      {
        this.setState({ IssueInputs: {
          title: this.state.IssueInputs.title, 
          status: input, 
          owner: this.state.IssueInputs.owner, 
          effort: this.state.IssueInputs.effort, 
          due: this.state.IssueInputs.due}});
          // console.log("Title:", this.state.IssueInputs.title, "Status:", this.state.IssueInputs.status, "Owner:", this.state.IssueInputs.owner, "Effort:", this.state.IssueInputs.effort, "Due:", this.state.IssueInputs.due);
          // console.log("aaa",this.state.IssueInputs);
      }
      else if(field === "owner")
      {
        this.setState({ IssueInputs: {
          title: this.state.IssueInputs.title, 
          status: this.state.IssueInputs.status, 
          owner: input, 
          effort: this.state.IssueInputs.effort, 
          due: this.state.IssueInputs.due}});
          // console.log("Title:", this.state.IssueInputs.title, "Status:", this.state.IssueInputs.status, "Owner:", this.state.IssueInputs.owner, "Effort:", this.state.IssueInputs.effort, "Due:", this.state.IssueInputs.due);
          // console.log("aaa",this.state.IssueInputs);
      }
      else if(field === "effort")
      {
        this.setState({ IssueInputs: {
          title: this.state.IssueInputs.title, 
          status: this.state.IssueInputs.status, 
          owner: this.state.IssueInputs.owner, 
          effort: input, 
          due: this.state.IssueInputs.due}});
          // console.log("Title:", this.state.IssueInputs.title, "Status:", this.state.IssueInputs.status, "Owner:", this.state.IssueInputs.owner, "Effort:", this.state.IssueInputs.effort, "Due:", this.state.IssueInputs.due);
          // console.log("aaa",this.state.IssueInputs);
      }
      else if(field === "due")
      {
        this.setState({ IssueInputs: {
          title: this.state.IssueInputs.title, 
          status: this.state.IssueInputs.status, 
          owner: this.state.IssueInputs.owner, 
          effort: this.state.IssueInputs.effort, 
          due: input}});
          // console.log("Title:", this.state.IssueInputs.title, "Status:", this.state.IssueInputs.status, "Owner:", this.state.IssueInputs.owner, "Effort:", this.state.IssueInputs.effort, "Due:", this.state.IssueInputs.due);
          // console.log("aaa",this.state.IssueInputs);
      }
    }
    /****** Q3: Code Ends here. ******/

    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      console.log("IssueInputs:", this.state.IssueInputs);
      const query = "mutation myissueAdd($title:String! , $status:StatusType , $owner: String, $effort:Int, $due: GraphQLDate )" +
                    "{issueAdd(issue: {title: $title, status:$status, owner:$owner, effort:$effort, due:$due})" +
                    "{id title status owner created effort due}}";
      const data = graphQLFetch(query, {title: this.state.IssueInputs.title, status: this.state.IssueInputs.status, owner: this.state.IssueInputs.owner, effort: this.state.IssueInputs.effort, due: this.state.IssueInputs.due});
      // this.setState({ IssueInputs: {title: '', status: '', owner: '', effort: '',  due: '' }});
      // issueAdd(issue: IssueInputs!): Issue!
      /****** Q3: Code Ends here. ******/
    }
  
    render() {
      return (
          <View>
          {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
            <TextInput placeholder='Please input title' value={this.state.IssueInputs.title} onChangeText={input=>{this.handleUpdate(input , "title")}}/>
            <TextInput placeholder='Please input status (Optional : "Assigned" or "New")' value={this.state.IssueInputs.status} onChangeText={input=>{this.handleUpdate(input , "status")}}/>
            <TextInput placeholder='Please input owner ("Assigned" must have owner)' value={this.state.IssueInputs.owner} onChangeText={input=>{this.handleUpdate(input , "owner")}}/>
            <TextInput placeholder='Please input effort (Optional)' value={this.state.IssueInputs.effort} onChangeText={input=>{this.handleUpdate(input , "effort")}}/>
            <TextInput placeholder='Please input due (Optional)' value={this.state.IssueInputs.due} onChangeText={input=>{this.handleUpdate(input , "due")}}/>
            <Button onPress={this.handleSubmit} title="Submit" />
          {/****** Q3: Code Ends here. ******/}
          </View>
      );
    }
  }

class BlackList extends React.Component {
    constructor()
    {   super();
        this.handleSubmit = this.handleSubmit.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = { name: '' };
        this.handleUpdate = this.handleUpdate.bind(this);
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleUpdate(newname) {
        this.setState({ name: newname });
        // console.log('name:', this.state.name);
        
    }
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    console.log('name:', this.state.name);
    const query = "mutation myaddToBlacklist($name: String!){addToBlacklist(nameInput: $name)}";
    const data = await graphQLFetch(query, {name: this.state.name});
    this.setState({ name: "" });
    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <Text>Add to Blacklist:</Text>
        <TextInput placeholder="Blacklist this name" value={this.state.name} onChangeText={newname=>{this.handleUpdate(newname)}}/>
        <Button onPress={this.handleSubmit} title="Submit"/>
        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    
    componentDidMount() {
    this.loadData();
    }

    async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
        this.loadData();
    }
    }
    
    
    render() {
    return (
    <ScrollView>
    {/****** Q1: Start Coding here. ******/}
    {/****** Q1: Code ends here ******/}
      <IssueFilter/>

    {/****** Q2: Start Coding here. ******/}
    {/****** Q2: Code ends here ******/}
      <IssueTable issues={this.state.issues} />
    
    {/****** Q3: Start Coding here. ******/}
      <IssueAdd />
    {/****** Q3: Code Ends here. ******/}
      
    {/****** Q4: Start Coding here. ******/}
      <BlackList />
    {/****** Q4: Code Ends here. ******/}
    </ScrollView>
      
    );
  }
}
