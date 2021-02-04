import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { prettyPrintStat } from '../utils';

const InfoBox = ({ title, cases, total, img, casestype, type, active }) => {

  return (
    <Card className={`infoBox ${active && 'active'}`} onClick={() => casestype(type)}>
      <CardContent>
        <img src={img} alt={img} />
        <div className="infoBox__details">
          <Typography className="infoBox__title">{title}</Typography>
          <h2 className="infoBox__cases">{prettyPrintStat(cases)}</h2>
          <Typography className="infoBox__total">{total} Total</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
