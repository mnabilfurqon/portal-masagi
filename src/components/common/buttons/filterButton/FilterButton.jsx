import React, {useState} from 'react';
import { Button, Dropdown, Tree, Flex } from 'antd';
import { BsFilter } from 'react-icons/bs'; // Import the icon
import './filterButton.css';

const FilterButton = ({onFilter, treeData}) => {
  const [checkedKeys, setCheckedKeys] = useState([]);

  const handleCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys);
    onFilter(checkedKeys);
  };

  const handleReset = () => {
    setCheckedKeys([]);
    onFilter([]);
  }

  return (
    <Dropdown
        overlay={
          <div>
          <Tree selectable={false} className='tree-filter' checkable checkedKeys={checkedKeys} treeData={treeData} onCheck={handleCheck} />
              <div style={{marginTop: 5}}></div>
              {checkedKeys.length > 0 && (
                <Button className='button-reset' onClick={handleReset}>Reset</Button>
              )}
          </div>
        }
        placement="bottom"
      >
        <Flex justify='center' align='center'>
        <Button icon={<BsFilter/>} className='filter-button'>Filter </Button>
        </Flex>
    </Dropdown>
  );
};
export default FilterButton;