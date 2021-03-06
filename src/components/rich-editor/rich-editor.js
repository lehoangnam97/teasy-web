import React from 'react';
import {RichUtils} from 'draft-js';
import PropTypes from 'prop-types';
import 'draft-js/dist/Draft.css';
import './rich-editor.scss';
import {BlockStyleControls, InlineStyleControls} from './rich-controls';
import createMathjaxPlugin from 'draft-js-mathjax-plugin'
import Editor, {composeDecorators} from 'draft-js-plugins-editor'
import {disabledStyleWrapper} from 'utils';
import createImagePlugin from 'draft-js-image-plugin';
import ImageUpload from '../upload/ImageUpload';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import "draft-js-image-plugin/lib/plugin.css"
import "draft-js-focus-plugin/lib/plugin.css"
import {makeStyles} from '@material-ui/core';
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    inlineToolbar: {},
    more:{
      marginTop: theme.spacing(-0.5),
      marginLeft:theme.spacing(1)
    },
    img:{
      marginLeft:theme.spacing(2)
    }
}))

export default function RichEditor(props) {

    const classes = useStyles();
    const blockDndPlugin = createBlockDndPlugin();
    const focusPlugin = createFocusPlugin();
    const resizeablePlugin = createResizeablePlugin({
        horizontal: "absolute",
        vertical: "absolute",
    });
    const alignmentPlugin = createAlignmentPlugin();
    const decorator = composeDecorators(
        resizeablePlugin.decorator,
        alignmentPlugin.decorator,
        focusPlugin.decorator,
        blockDndPlugin.decorator
    );

    const imagePlugin = createImagePlugin({decorator});
    const mathJaxPlugin = createMathjaxPlugin();
    const {profile = {}} = useSelector(state => state.authReducer) || {};
    const {id: userId} = profile || {};


    const {editorState, onChange, readOnly, renderMoreOptions = null} = props;
    const [plugins, setPlugins] = React.useState([mathJaxPlugin, resizeablePlugin, alignmentPlugin, focusPlugin, blockDndPlugin, imagePlugin]);

    function handleOnChange(editorState) {
        onChange && onChange(editorState);
    }


    function handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return true;
        }
        return false;
    }

    function onTab(e) {
        const maxDepth = 4;
        handleOnChange(RichUtils.onTab(e, editorState, maxDepth));
    }

    function toggleBlockType(blockType) {
        handleOnChange(RichUtils.toggleBlockType(editorState, blockType));
    }

    function toggleInlineStyle(inlineStyle) {
        handleOnChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }


    let className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    // const { AlignmentTool } = plugins[2];

    return (
        <div style={readOnly === true ? disabledStyleWrapper(true, {}, {opacity: 1, border: 0}) : {}}
             className="RichEditor-root">
            {readOnly === false && <div className={classes.toolbar}>
                <BlockStyleControls editorState={editorState} onToggle={toggleBlockType}/>
                <InlineStyleControls className={classes.InlineToolbar} editorState={editorState}
                                     onToggle={toggleInlineStyle}/>
                <div className={classes.more}>
                  {renderMoreOptions()}
                </div>

                <ImageUpload
                    onUploaded={(url) => {
                        onChange(plugins[5].addImage(editorState, url));
                    }}
                    category="Question"
                    userId={userId}
                    buttonLabel="Chèn ảnh"/>


            </div>}
            <div className={className}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={handleOnChange}
                    onTab={onTab}
                    placeholder="Nhập nội dung câu hỏi..."
                    spellCheck={false}
                    plugins={plugins}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
}
RichEditor.propTypes = {
    editorState: PropTypes.any,
    onChange: PropTypes.func,
    readOnly: PropTypes.any,
    renderMoreOptions: PropTypes.any,
};

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}





