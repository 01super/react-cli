import React, { Component } from 'react';

function formWrapper(Com) {
  return class CreateFrom extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }

    options: object;

    handleValueChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };

    getFieldDecorator = (field: string, option: any) => (input: React.ReactHTMLElement<any>) => {
      this.options[field] = option;
      return React.cloneElement(input, {
        name: field,
        value: this.state[field] || '',
        onChange: this.handleValueChange
      });
    };

    getFieldsValue = () => ({ ...this.state });

    getFieldValue = (name: string) => ({ [name]: this.state[name] });

    validateFields = (callback) => {
      const errors = {};
      Object.keys(this.options).forEach((i) => {
        if (this.state[i] === undefined) {
          errors[i] = 'error';
        }
      });
      if (JSON.stringify(errors) === '{}') {
        callback(undefined, { ...this.state });
      } else {
        callback(errors, { ...this.state });
      }
    };

    render() {
      return (
        <Com
          {...this.props}
          getFieldsValue={this.getFieldsValue}
          getFieldDecorator={this.getFieldDecorator}
          getFieldValue={this.getFieldValue}
          validateFields={this.validateFields}
        />
      );
    }
  };
}

export default formWrapper;
