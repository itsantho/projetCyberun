import { FC, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';

import { Drawer, Typography, Menu, Button } from "antd";

import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';

import schema from '../schema.json';
import uischema from '../uischema.json';
import schema2 from '../schema2.json';
import uischema2 from '../uischema2.json';

const classes = {
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
};

const initialData = {
  provideAddress: true,
  vegetarian: false,
};


export const JsonFormsDemo: FC = () => {
  const [data, setData] = useState<object>(initialData);


  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSet, setActiveSet] = useState<"set1"| "set2" | null>(null);

  const categories_1 = uischema.elements.map((category: any) => ({
    label: category.label,
    key: category.label,
    elements: category.elements,
  }));
  const categories_2 = uischema2.elements.map((category: any) => ({
    label: category.label,
    key: category.label,
    elements: category.elements,
  }));
  // Trouver la catégorie active

  const activeUISchema = activeSet === "set1"
    ? categories_1.find((cat) => cat.key === activeCategory)
    : activeSet === "set2"
      ? categories_2.find((cat) => cat.key === activeCategory)
      : null;


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  return (
      <Grid item sm={6}>

        <Typography variant={'h1'}>Challenge Cyberun</Typography>
        <div style={classes.demoform}>
          <Button type="primary" onClick={showDrawer}>
            Open drawer
          </Button>
          <Drawer title="Basic Drawer" onClose={onClose} open={open} placement={'left'}>
            <Typography variant={'h2'}>Set 1 - Personal data</Typography>
            <Menu
              mode="inline"
              onClick={(e) => {
                setActiveSet("set1")
                setActiveCategory(e.key);
                setOpen(false);
              }}
              selectedKeys={activeCategory ? [activeCategory] : []}
              items={categories_1.map((cat) => ({ key: cat.key, label: cat.label }))}
            />
            <Typography variant={'h2'}>Set 2 - Professional data</Typography>
            <Menu
              mode="inline"
              onClick={(e) => {
                setActiveSet("set2")
                setActiveCategory(e.key);
                setOpen(false);
              }}
              selectedKeys={activeCategory ? [activeCategory] : []}
              items={categories_2.map((cat) => ({ key: cat.key, label: cat.label }))}
            />
          </Drawer>
          {activeCategory && activeUISchema && (
            <div style={{ marginTop: 20, padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <Typography.Title level={4}>{activeCategory}</Typography.Title>
              <JsonForms
                schema={activeSet === "set1" ? schema : schema2}
                uischema={{ type: "VerticalLayout", elements: activeUISchema.elements }}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data }) => setData(data)}
              />
              <Button type="primary" >send</Button>
            </div>)}
        </div>
      </Grid>
  );
};
