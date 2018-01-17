import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select, Row, Col, Checkbox } from 'antd'
import city from '../../utils/city'
import { isArray } from 'lodash'

const FormItem = Form.Item
const Option = Select.Option
const CheckboxGroup = Checkbox.Group

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
}

function getFormItemLayout (multi) {
  return {
    labelCol: {
      span: 3 * multi,
    },
    wrapperCol: {
      span: 24 - 3 * multi,
    },
  }
}

function getBasicInput (type = '', getFieldDecorator, item, typeName) {
  return (<div>
    <Row gutter={24}>
      <Col span={8}>
        <FormItem label={`${typeName}姓名`} hasFeedback {...getFormItemLayout(3)}>
          {getFieldDecorator(`name${type}`, {
            initialValue: item[`name${type}`],
            rules: [
              {
                required: !(type || typeName),
              },
            ],
          })(<Input />)}
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem label={`${typeName}性别`} hasFeedback {...getFormItemLayout(3)}>
          {getFieldDecorator(`isMale${type}`, {
            initialValue: item[`isMale${type}`],
            rules: [
              {
                required: !(type || typeName),
                type: 'boolean',
              },
            ],
          })(<Radio.Group>
            <Radio value>男</Radio>
            <Radio value={false}>女</Radio>
          </Radio.Group>)}
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem label={`${typeName}年龄`} hasFeedback {...getFormItemLayout(3)}>
          {getFieldDecorator(`age${type}`, {
            initialValue: item[`age${type}`],
            rules: [
              {
                // required: true,
                type: 'number',
              },
            ],
          })(<InputNumber min={18} max={100} />)}
        </FormItem>
      </Col>
    </Row>
    {typeName && type && <div>
      <Row>
        <Col span={8}>
          <FormItem label={`${typeName}属相`} hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator(`cZodiac${type}`, {
              initialValue: item[`cZodiac${type}`],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={`${typeName}星座`} hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator(`constellation${type}`, {
              initialValue: item[`constellation${type}`],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={`${typeName}性格`} hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator(`charactor${type}`, {
              initialValue: item[`charactor${type}`],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label={`${typeName}五行`} hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator(`wuxing${type}`, {
              initialValue: item[`wuxing${type}`],
            })(<Input />)}
          </FormItem>
        </Col>
      </Row>
    </div>}
  </div>)
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      data.address = isArray(data.address) && data.address.join(' ')
      console.log(data)
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        {getBasicInput('', getFieldDecorator, item, '')}
        <FormItem label="电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '输入的不是有效手机号!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address,
          })(<Input />)}
        </FormItem>
        <Row>
          <Col span={12}>
            <FormItem label="电子邮件" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('email', {
                initialValue: item.email,
                rules: [
                  {
                    // required: true,
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: '输入的不是合法email!',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="血型" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('bloodType', {
                initialValue: item.bloodType,
              })(<Select>
                <Option value="O">O</Option>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="AB">AB</Option>
                <Option value="other">其他</Option>
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="负责美容师" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('cosmetologist', {
                initialValue: item.cosmetologist,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="负责顾问" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('counselor', {
                initialValue: item.counselor,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="负责店长" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('shopManager', {
                initialValue: item.shopManager,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="负责市场老师" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('marketing', {
                initialValue: item.marketing,
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="职业" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('profession', {
                initialValue: item.profession,
              })(<Select>
                <Option value="owner">私营企业主</Option>
                <Option value="civilServant">国企/公务员</Option>
                <Option value="officeWorker">公司白领</Option>
                <Option value="housewife">家庭主妇</Option>
                <Option value="freelancer">自由职业者</Option>
                <Option value="others">其他</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="婚姻" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('marriage', {
                initialValue: item.marriage,
              })(<Select>
                <Option value="married">已婚</Option>
                <Option value="divorced">离异</Option>
                <Option value="single">单身</Option>
                <Option value="inRelation">恋爱中</Option>
                <Option value="other">其他</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="子女" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('child', {
                initialValue: item.child,
              })(<Select>
                <Option value="single">独生子女</Option>
                <Option value="none">无</Option>
                <Option value="multi">多子女</Option>
                <Option value="abortion">流产</Option>
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="个性特点" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('charactor', {
                initialValue: item.charactor,
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        {getBasicInput('mate', getFieldDecorator, item, '配偶')}
        {getBasicInput('child', getFieldDecorator, item, '子女')}
        <Row>
          <Col span={12}>
            <FormItem label="顾客类型" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('isNewCustomer', {
                initialValue: item.isNewCustomer,
                rules: [
                  {
                    type: 'boolean',
                  },
                ],
              })(<Radio.Group>
                <Radio value>新顾客</Radio>
                <Radio value={false}>老顾客</Radio>
              </Radio.Group>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="在店月数" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('period', {
                initialValue: item.period,
                rules: [
                  {
                    type: 'number',
                  },
                ],
              })(<InputNumber min={0} />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="月度消费" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('monthlyRate', {
                initialValue: item.monthlyRate,
                rules: [
                  {
                    type: 'number',
                  },
                ],
              })(<InputNumber min={0} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="年度消费" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('yearlyRate', {
                initialValue: item.yearlyRate,
                rules: [
                  {
                    type: 'number',
                  },
                ],
              })(<InputNumber min={0} />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="单次最高消费" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('maxRate', {
                initialValue: item.maxRate,
                rules: [
                  {
                    type: 'number',
                  },
                ],
              })(<InputNumber min={0} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="每月来访数" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('visitCount', {
                initialValue: item.visitCount,
                rules: [
                  {
                    type: 'number',
                  },
                ],
              })(<InputNumber min={0} />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="认可老板度" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('satisfWithBoss', {
                initialValue: item.satisfWithBoss,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="认可效果度" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('satisfWithEff', {
                initialValue: item.satisfWithEff,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="对店忠诚度" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('loyaty', {
                initialValue: item.loyaty,
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <FormItem label="消费轨迹" hasFeedback {...formItemLayout}>
          {getFieldDecorator('purchaseTrack', {
            initialValue: item.purchaseTrack,
          })(<Input />)}
        </FormItem>
        <Row>
          <Col span={8}>
            <FormItem label="夫妻关系" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('mateRelation', {
                initialValue: item.mateRelation,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="车辆信息" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('carsInfo', {
                initialValue: item.carsInfo,
              })(<Input placeholder="品牌和数量" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="最得意成就" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('achievement', {
                initialValue: item.achievement,
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="销售方式" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('saleWay', {
                initialValue: item.saleWay,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="不动产" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('property', {
                initialValue: item.property,
              })(<Input placeholder="居住条件及产业" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="奢侈品牌" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('luxuryBrand', {
                initialValue: item.luxuryBrand,
              })(<Input placeholder="已拥有奢侈品牌" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="最关注问题" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('mostConcerned', {
                initialValue: item.mostConcerned,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="身体状况" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('health', {
                initialValue: item.health,
              })(<Input placeholder="健康/一般/很差（说明病理）" />)}
            </FormItem>
          </Col>
        </Row>
        <FormItem label="今年曾体检" hasFeedback {...formItemLayout}>
          {getFieldDecorator('medExam', {
            initialValue: item.medExam,
            rules: [{
              type: 'boolean',
            }],
          })(<Radio.Group>
            <Radio value>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>)}
        </FormItem>
        <Row>
          <Col span={8}>
            <FormItem label="遗传病" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('geneticDisease', {
                initialValue: item.geneticDisease,
              })(<Input placeholder="三代以内遗传病史" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="禁忌话题" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('forbidenTopic', {
                initialValue: item.forbidenTopic,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="理想效果" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('goal', {
                initialValue: item.goal,
              })(<Input placeholder="客户最想达到的理想效果" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="高端项目使用" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('hiProjects', {
                initialValue: item.hiProjects,
              })(<Input placeholder="干细胞/HIGH/人体胎盘素/光电仪器/面雕/荷尔蒙" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="高端保健品" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('hiProd', {
                initialValue: item.hiProd,
              })(<Input placeholder="酵素/玛卡/SOD/胶原蛋白/花青素" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="铺垫项目" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('preProj', {
                initialValue: item.preProj,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="铺垫专家" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('preProfessor', {
                initialValue: item.preProfessor,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="铺垫价格" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('prePrice', {
                initialValue: item.prePrice,
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="对项目态度" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('attitudeToProj', {
                initialValue: item.attitudeToProj,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="对价格态度" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('attitudeToPrice', {
                initialValue: item.attitudeToPrice,
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="经济自主权" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('spendRight', {
                initialValue: item.spendRight,
              })(<Select>
                <Option value="full">完全自主</Option>
                <Option value="half">部分自住</Option>
                <Option value="zero">依靠他人</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="经济权补充" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('spendMemo', {
                initialValue: item.spendMemo,
              })(<Input placeholder="关于对待经济的其他补充说明" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="医学知识" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('medKnowledge', {
                initialValue: item.medKnowledge,
              })(<Select>
                <Option value="pro">非常熟悉</Option>
                <Option value="good">熟悉</Option>
                <Option value="common">一般</Option>
                <Option value="none">一无所知</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="对专家了解" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('familiarWithPro', {
                initialValue: item.familiarWithPro,
              })(<Select>
                <Option value="pro">非常熟悉</Option>
                <Option value="good">熟悉</Option>
                <Option value="common">一般</Option>
                <Option value="none">一无所知</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="是否有情人" hasFeedback {...getFormItemLayout(3)}>
              {getFieldDecorator('has3', {
                initialValue: item.has3,
              })(<Select>
                <Option value="yes">有</Option>
                <Option value="no">无</Option>
                <Option value="mateHas">配偶有情人</Option>
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="消费类型" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('consumingType', {
                initialValue: item.consumingType,
              })(<Select>
                <Option value="institute">冲动型</Option>
                <Option value="objective">理智型</Option>
                <Option value="perfection">完美型</Option>
                <Option value="stingy">计较型</Option>
                <Option value="unbelieving">多疑型</Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="爱美程度" hasFeedback {...getFormItemLayout(2)}>
              {getFieldDecorator('likeMakeUp', {
                initialValue: item.likeMakeUp,
              })(<Select>
                <Option value="very">非常</Option>
                <Option value="common">一般</Option>
                <Option value="none">随意</Option>
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <FormItem label="看待奢侈品" hasFeedback {...formItemLayout}>
          {getFieldDecorator('luxuryAttitude', {
            initialValue: item.luxuryAttitude,
          })(<Input placeholder="对待奢侈品的态度" />)}
        </FormItem>
      </Form>
      <Row>
        <Col span={8}>
          <FormItem label="住宅级别" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('houseLev', {
              initialValue: item.houseLev,
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="私车级别" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('autoLev', {
              initialValue: item.autoLev,
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="财务状况" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('economy', {
              initialValue: item.economy,
            })(<Input />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <FormItem label="私房钱" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('personalMoney', {
              initialValue: item.personalMoney,
              rules: [
                {
                  type: 'number',
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="家族财产" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('familyProperty', {
              initialValue: item.familyProperty,
              rules: [
                {
                  type: 'number',
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="铺垫出国带钱" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('preAbordMoney', {
              initialValue: item.preAbordMoney,
              rules: [
                {
                  type: 'number',
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <FormItem label="2月店内消费" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('twoMonthInStore', {
              initialValue: item.twoMonthInStore,
              rules: [
                {
                  type: 'number',
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="2月其他消费" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('twoMonthOther', {
              initialValue: item.twoMonthOther,
              rules: [
                {
                  type: 'number',
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="2月大额消费" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('twoMonthJumbo', {
              initialValue: item.twoMonthJumbo,
              rules: [
                {
                  type: 'number',
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label="爱好" hasFeedback {...getFormItemLayout(2)}>
            {getFieldDecorator('hobby', {
              initialValue: item.hobby,
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="习惯" hasFeedback {...getFormItemLayout(2)}>
            {getFieldDecorator('habit', {
              initialValue: item.habit,
            })(<Input />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <FormItem label="夫妻同行" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('withCouple', {
              initialValue: item.withCouple,
              rules: [
                {
                  type: 'boolean',
                },
              ],
            })(<Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="姐妹同行" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('withGirl', {
              initialValue: item.withGirl,
              rules: [
                {
                  type: 'boolean',
                },
              ],
            })(<Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="母女同行" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('withMom', {
              initialValue: item.withMom,
              rules: [
                {
                  type: 'boolean',
                },
              ],
            })(<Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <FormItem label="医生顾客" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('isDoc', {
              initialValue: item.isDoc,
              rules: [
                {
                  type: 'boolean',
                },
              ],
            })(<Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="残疾顾客" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('disabled', {
              initialValue: item.disabled,
              rules: [
                {
                  type: 'boolean',
                },
              ],
            })(<Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="精神障碍" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('mentalD', {
              initialValue: item.mentalD,
              rules: [
                {
                  type: 'boolean',
                },
              ],
            })(<Radio.Group>
              <Radio value>有</Radio>
              <Radio value={false}>无</Radio>
            </Radio.Group>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <FormItem label="有男陪同" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('withBoy', {
              initialValue: item.withBoy,
              rules: [
                {
                  type: 'boolean',
                },
              ],
            })(<Radio.Group>
              <Radio value>有</Radio>
              <Radio value={false}>无</Radio>
            </Radio.Group>)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="88后" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('eight8s', {
              initialValue: item.eight8s,
              rules: [
                {
                  type: 'boolean',
                },
              ],
            })(<Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="店主陪同" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('withBoss', {
              initialValue: item.withBoss,
              rules: [
                {
                  type: 'boolean',
                },
              ],
            })(<Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <FormItem label="出境次数" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('abordCount', {
              initialValue: item.abordCount,
              rules: [
                {
                  type: 'number',
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="店终端数" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('clientCountOfShop', {
              initialValue: item.clientCountOfShop,
              rules: [
                {
                  type: 'number',
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="店成交率" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('dealPerc', {
              initialValue: item.dealPerc,
              rules: [
                {
                  type: 'number',
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <FormItem label="申报店" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('shop', {
              initialValue: item.shop,
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="服务商总监" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('shopDirector', {
              initialValue: item.shopDirector,
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="申报服务商老板" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('shopBoss', {
              initialValue: item.shopBoss,
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="申报执行经理" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('shopExManager', {
              initialValue: item.shopExManager,
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="事业部负责人" hasFeedback {...getFormItemLayout(3)}>
            {getFieldDecorator('responsor', {
              initialValue: item.responsor,
            })(<Input />)}
          </FormItem>
        </Col>
      </Row>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
