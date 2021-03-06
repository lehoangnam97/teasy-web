import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {
    InputLabel,
    Select,
    MenuItem,
    FormControl, Grid, IconButton, Checkbox,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import {QUESTION_LEVEL_CODE, QUESTION_LEVEL_TEXT, QUESTION_TYPE_CODES, QUESTION_TYPE_TEXT, TEXT} from "../../consts";
import RichEditor from "../rich-editor/rich-editor";
import {EditorState} from 'draft-js';
import EditingQuiz from "./editing-quiz";
import {Close as CloseIcon} from "@material-ui/icons";
import {updateEditingTest} from "../../actions";
import produce from "immer";
import {addToNormalizedList, DefaultNormalizer} from "../../utils/byid-utils";
import {useDispatch} from "react-redux";
import EditingFillBlank from "./editing-fill-blank";
import EditingMatching from "./editing-matching";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputBase from "@material-ui/core/InputBase";


const useStyles = makeStyles((theme) => ({
    root: {display: 'flex'},
    selectTypeBox: {width: '100%'},
    header: {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
    typeContainer: {marginBottom: theme.spacing(3)},
    inputBase: {
        marginTop: theme.spacing(1),
        paddingLeft:theme.spacing(1),
        paddingRight:theme.spacing(1),
        borderBottom: '1px solid ' + theme.palette.background.paper,
        marginBottom: theme.spacing(1),
        "&:hover": {
            borderBottomColor: theme.palette.grey[400]
        },
        "&:focus": {
            backgroundColor: 'green',
        },
        "&:focus-within": {
            borderBottomColor: theme.palette.primary.main
        },
        "&:active": {}
    },
    chuthich:{
      // marginBotom: theme.spacing(5),
    },
    inputt:{
      border: '1px solid #ced4da',
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(0.5),
    }
}));

export default function EditingQuestionContent(props) {
    const {data, onChange, onRemove, hideRemove = false} = props;
    const classes = useStyles();
    const {type: questionTypeCode = '', content, id, level, explanation = null} = data;
    const [explChecked, setExplChecked]=useState(!!explanation);


    const dispatch = useDispatch();

    useEffect(() => {
        if (!content) {
            onChange({content: EditorState.createEmpty()})
        }
    }, []);


    function handleChangeQuestionType(event) {
        onChange({type: event.target.value});
    }

    function handleQuestionLevelChange(event) {
        onChange({level: event.target.value});
    }

    if (!content) {
        onChange({content: EditorState.createEmpty()});
    }

    function handleEditorChange(event) {
        onChange({content: event});
    }

    function handleQuestionFormChange(newData) {
        onChange({...newData});
    }

    function handleExplanationChange(event) {
        setExplChecked(event.target.checked);
        if (!event.target.checked) {
            onChange({explanation: null});
        } else {
            onChange({explanation: ''})
        }
    }

    function handleRemoveQuestion() {
        onRemove && onRemove(id);
    }

    function renderQuestionFormByType() {
        switch (questionTypeCode) {
            case QUESTION_TYPE_CODES.quiz:
                return <EditingQuiz data={data} onChange={handleQuestionFormChange}/>;
            case QUESTION_TYPE_CODES.essay:
                return <div/>;
            case QUESTION_TYPE_CODES.fillBlank:
                return <EditingFillBlank data={data} onChange={handleQuestionFormChange}/>;
            case QUESTION_TYPE_CODES.matching:
                return <EditingMatching data={data} onChange={handleQuestionFormChange}/>;
            case QUESTION_TYPE_CODES.quizMulti:
                return <div/>;
        }
    }


    function renderQuestionTypeMenu(questionTypeCode) {
        return (
            <MenuItem key={questionTypeCode} value={questionTypeCode}>{QUESTION_TYPE_TEXT[questionTypeCode]}</MenuItem>)
    }

    function renderQuestionLevelMenu(code) {
        return (
            <MenuItem key={code} value={code}>{QUESTION_LEVEL_TEXT[code]}</MenuItem>)
    }

    function renderExplanationCheckbox() {
        return (<FormControlLabel
            control={
                <Checkbox 
                className={classes.chuthich}
                onChange={handleExplanationChange}/>
            }
            label="Thêm giải thích"
        />)
    }

    function renderExplanation() {
        if (!explChecked)
            return null;
        return (<InputBase multiline value={explanation}
                           className={classes.inputBase}
                           fullWidth
                           placeholder='Giải thích đáp án (hiển thị lúc nộp bài)'
                           variant="outlined"
                           onChange={(event) => onChange({explanation: event.target.value})}
        />)
    }

    return (<div>
        <Grid container direction="row" className={classes.header}>
            <Grid item xl={5} sm={12} md={7} xs={12} s={12} className={classes.typeContainer}>
                <span style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <FormControl className={classes.selectTypeBox}>
                    <Select value={(questionTypeCode === 0 || questionTypeCode > 0) ? questionTypeCode : -1}
                            onChange={handleChangeQuestionType}
                            displayEmpty
                            disableUnderline
                            className={classes.inputt}
                            inputProps={{
                                name: 'question-type-selector', id: 'question-type-selector',
                            }}>
                        <MenuItem value={-1} disabled key={'placeholder'}>
                            Chon {TEXT.type}
                        </MenuItem>
                        {Object.values(QUESTION_TYPE_CODES).map(renderQuestionTypeMenu)}
                    </Select>
                </FormControl>
                <FormControl className={classes.selectTypeBox} style={{marginLeft: 20}}>
                    <Select value={(level === 0 || level > 0) ? level : -1}
                            onChange={handleQuestionLevelChange}
                            displayEmpty
                            disableUnderline
                            className={classes.inputt}
                            inputProps={{
                                name: 'question-level-selector', id: 'question-level-selector',
                            }}>
                        <MenuItem value={-1} disabled key={'placeholder'}>
                            Chon {`${TEXT.level} ${TEXT.question}`}
                        </MenuItem>
                        {Object.values(QUESTION_LEVEL_CODE).map(renderQuestionLevelMenu)}
                    </Select>
                </FormControl>
                </span>
            </Grid>
            <Grid item>
                {!hideRemove &&
                (<IconButton edge="start" color="inherit" onClick={handleRemoveQuestion} aria-label="close">
                    <CloseIcon/>
                </IconButton>)}
            </Grid>
        </Grid>
        {content && <RichEditor readOnly={false}
                                renderMoreOptions={renderExplanationCheckbox}
                                editorState={content} onChange={handleEditorChange}/>}
        {renderExplanation()}
        {renderQuestionFormByType()}
    </div>);
}


EditingQuestionContent.propTypes = {
    data: PropTypes.any,
    onChange: PropTypes.func
};

EditingQuestionContent.defaultProps = {
    onChange: () => {
    }
};
