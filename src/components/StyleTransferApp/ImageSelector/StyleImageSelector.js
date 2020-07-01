import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Popover from '@material-ui/core/Popover';

import Slider from '../CustomSlider/CustomSlider';

const useStyles = (theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
      maxWidth: 600,
      textAlign: 'left'
    },
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(2),
    },
  });

class StyleImageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: 'seaport',
            imageSrc: "./style/seaport.jpg",
            imgHeight: 250,
            menulist: [
                {value: 'upload', name: "Upload a picture"},
                {value: 'random', name: 'Random image from wikiart.org'},
                {value: 'clouds', name: 'Clouds'},
                {value: 'towers', name: 'Towers'},
                {value: 'sketch', name: 'Sketch'},
                {value: 'udnie', name: 'Udnie'},
                {value: 'seaport', name: 'Seaport'},
            ],
            anchorEl: null
        }
    }

    handleMenu = (event) => {
        if (event.target.value === 'random') {
            return;
        } else if (event.target.value === 'upload') {
            return;
        } 
        this.setState({image: event.target.value, imageSrc: "./style/" + event.target.value + ".jpg"});
    }

    onSliderValueChange = (event, newValue) => {
        this.setState({imgHeight: newValue});
    }

    handlePopoverOpen = (event) => {
        this.setState({anchorEl: event.currentTarget});
    }

    handlePopoverClose = () => {
        this.setState({anchorEl: null});
    }

    render() {
        const {classes} = this.props;
        

        return (
            <div className='selector-container'>
                <img className="center" src={this.state.imageSrc} height={this.state.imgHeight} alt="content_img"/>
                <br/>
                <div className={classes.formControl} style={{ marginBottom: '.1rem', display: 'inline-block', verticalAlign: 'middle'}}>
                    <Typography style={{display:'inline-block', marginRight:'6px'}}>
                        Style Image size
                    </Typography>
                    <HelpOutlineOutlinedIcon  
                        fontSize='small' color='action' 
                        style={{marginBottom:-4}}
                        aria-owns={this.state.anchorEl ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={this.handlePopoverOpen}
                        onMouseLeave={this.handlePopoverClose}/>

                    <Popover
                            id="mouse-over-popover"
                            className={classes.popover}
                            classes={{
                            paper: classes.paper,
                            }}
                            open={this.state.anchorEl}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            onClose={this.state.handlePopoverClose}
                            disableRestoreFocus
                        >
                            <Typography style={{maxWidth: 200, textAlign: 'center'}}>
                                Changing the size of style image affects the texture seen by the network thus changing the pattern used in generated image. 
                            </Typography>
                        </Popover>
                </div>
                
      
                
                <Slider 
                    className={classes.formControl} 
                    sliderChangeHandler={this.onSliderValueChange}
                    value={this.state.imgHeight}
                    min={250}
                    max={400}
                    step={1}/>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="content-label">Style Image</InputLabel>
                    <Select
                        labelId="content-label"
                        id="content-select"
                        value={this.state.image}
                        onChange={this.handleMenu}
                        label="Style Image">
                        {this.state.menulist.map(option => (<MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>))}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

export default withStyles(useStyles)(StyleImageSelector);