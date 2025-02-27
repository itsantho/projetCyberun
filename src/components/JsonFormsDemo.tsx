import { FC, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Drawer, Typography, Menu } from "antd";

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
  name: 'Send email to Anthony',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3,
  provideAddress: true,
  vegetarian: false,
};
const sections = [
  {
    title: "Section 1",
    schema: schema,
    categories: uischema.elements.map((cat: any) => ({
      label: cat.label,
      key: `section1-${cat.label}`,
      elements: cat.elements,
    })),
  },
  {
    title: "Section 2",
    schema: schema2,
    categories: uischema2.elements.map((cat: any) => ({
      label: cat.label,
      key: `section2-${cat.label}`,
      elements: cat.elements,
    })),
  },
];

export const JsonFormsDemo: FC = () => {
  const [data, setData] = useState<object>(initialData);


  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = uischema.elements.map((category: any) => ({
    label: category.label,
    key: category.label,
    elements: category.elements,
  }));
  // Trouver la catégorie active
  const activeUISchema = categories.find((cat) => cat.key === activeCategory);


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
            <Menu
              mode="inline"
              onClick={(e) => {
                setActiveCategory(e.key);
                setOpen(false);
              }}
              selectedKeys={activeCategory ? [activeCategory] : []}
              items={categories.map((cat) => ({ key: cat.key, label: cat.label }))}
            />

          </Drawer>
          {activeCategory && activeUISchema && (
            <div style={{ marginTop: 20, padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <Typography.Title level={4}>{activeCategory}</Typography.Title>
              <JsonForms
                schema={schema}
                uischema={{ type: "VerticalLayout", elements: activeUISchema.elements }}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data }) => setData(data)}
              />
            </div>)}
          </div>
      </Grid>

  );
};
