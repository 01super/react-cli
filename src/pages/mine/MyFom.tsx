import React, { Component } from 'react';
import formWrapper from '@/components/createFrom';

@formWrapper
class MyFom extends Component {
  render() {
    const { getFieldsValue, getFieldValue, getFieldDecorator, validateFields } = this.props;
    return (
      <div>
        <div>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'please input' }]
          })(<input type="text" placeholder="name" />)}
        </div>
        <div>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'please input' }]
          })(<input type="password" placeholder="password" />)}
        </div>
        <button
          type="submit"
          onClick={() =>
            validateFields((err, val) => {
              if (err) console.error(err);
              else console.log(val);
            })
          }
        >
          submit
        </button>
        <button type="button" onClick={() => console.log(getFieldValue('name'))}>
          get name
        </button>
        <button type="button" onClick={() => console.log(getFieldsValue())}>
          get all
        </button>
      </div>
    );
  }
}

export default MyFom;
