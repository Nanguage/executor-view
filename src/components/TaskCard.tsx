import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface IProps {
  name: string,
  description: string,
}


export default function TaskCard(props: IProps) {
  return (
    <Card sx={{ minWidth: 275 }}>

      <CardContent>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>

        <Typography variant="body2">
          {props.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Launch</Button>
      </CardActions>
    </Card>
  );
}
