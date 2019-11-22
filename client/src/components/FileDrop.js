import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import makeStyles from "@material-ui/core/styles/makeStyles";
import initialDropzoneImage from "../images/dropzone300.png";

const useStyles = makeStyles({
    thumb: {
        display: "inline-flex",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        padding: 4,
        boxSizing: "border-box"
    },
    thumbInner: {
        display: "flex",
        minWidth: 0,
        overflow: "hidden"
    },
    img: {
        display: "block",
        maxWidth: "100%",
        height: "auto",
        maxHeight: "200px" // specify exact number to prevent stretching in Safari
    },
    thumbsContainer: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    }
});

export function FileDrop(props) {
    const [dropzoneImage, setDropzoneImage] = useState(initialDropzoneImage);
    const { option, setImageFile } = props;
    const classes = useStyles();
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop: acceptedFiles => {
            setImageFile(acceptedFiles, option);
            acceptedFiles.forEach(file => {
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                });
                setDropzoneImage(file.preview);
            });
        }
    });

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            URL.revokeObjectURL(dropzoneImage.preview);
        },
        [dropzoneImage]
    );

    return (
        <section>
            <div className={classes.thumbsContainer} {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={classes.thumb} key={option}>
                    <div className={classes.thumbInner}>
                        <img
                            src={dropzoneImage}
                            className={classes.img}
                            alt="option"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
