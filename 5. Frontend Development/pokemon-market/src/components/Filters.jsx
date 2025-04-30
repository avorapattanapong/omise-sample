import {Input, Select, Divider, Row, Col, Space, Typography} from 'antd';

const { Text, Title } = Typography;
const { Option } = Select;

function Filters({ setFilters, types, rarities, onBlur }) {
  return (
    <div style={{display: 'flex', flexGrow: '1', justifyContent: 'space-between', marginBottom: 24}}>
      <div style={{display: 'flex', flexGrow: '1', alignItems: 'start', flexDirection: 'column'}}>
        <Title level={3}>Choose a Card</Title>
      </div>
      <div style={{
        display: 'flex',
        flexGrow: '1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap:20,
        paddingTop: 20
      }}>
        <div style={{display: 'flex', flexGrow: '1'}}>
          <Input.Search
            placeholder="Set Name"
            onChange={(e) => {setFilters({ set: e.target.value })}}
            onSearch={() => onBlur()}
            allowClear
          />
        </div>
        <div style={{display: 'flex', flexGrow: '1'}}>
          <Select
            placeholder="Type"
            onChange={(value) => setFilters({ type: value })}
            onBlur={onBlur}
            allowClear
            style={{ width: '100%' }}
          >
            {types?.map((type) => (
              <Option key={type} value={type}>{type}</Option>
            ))}
          </Select>
        </div>
        <div style={{display: 'flex', flexGrow: '1'}}>
          <Select
            placeholder="Rarity"
            onChange={(value) => setFilters({ rarity: value })}
            allowClear
            onBlur={onBlur}
            style={{ width: '100%' }}
          >
            {rarities?.map((rarity) => (
              <Option key={rarity} value={rarity}>{rarity}</Option>
            ))}
          </Select>
        </div>




      </div>
    </div>
  );
}

export default Filters;
