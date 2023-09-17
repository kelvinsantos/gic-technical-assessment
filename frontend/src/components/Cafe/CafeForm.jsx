import { TextField, Button, Grid, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ImageCallRenderer from '../ImageCallRenderer';
import { convertBase64 } from '../../utils';

const CafeSchema = Yup.object().shape({
    description: Yup.string().max(256).required('Required'),
    location: Yup.string().required('Required'),
    name: Yup.string().min(6).max(10).required('Required')
});

CafeForm.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    handleCreateFn: PropTypes.func,
    handleUpdateFn: PropTypes.func,
    handleClose: PropTypes.func.isRequired
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
});

const MAX_FILE_SIZE = 2000000; // 2mb

export default function CafeForm({
    data,
    loading,
    handleCreateFn,
    handleUpdateFn,
    handleClose
}) {
    const [file, setFile] = useState();

    return (
        <Formik
            initialValues={{
                id: data?.id || '',
                description: data?.description || '',
                location: data?.location || '',
                name: data?.name || ''
            }}
            validationSchema={CafeSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(async () => {
                    if (file && file?.size > 2000000) {
                        return;
                    }

                    if (data?.id) {
                        if (file) {
                            const base64 = await convertBase64(file);
                            values.logo = base64;
                        }
                        handleUpdateFn(data?.id, values);
                        handleClose(false);
                    } else {
                        delete values.id;
                        if (file) {
                            const base64 = await convertBase64(file);
                            values.logo = base64;
                        }
                        handleCreateFn(values);
                        handleClose(false);
                    }

                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ values, errors, touched, handleChange, handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        {data ? (
                            <TextField
                                margin="dense"
                                id="id"
                                label="ID"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                value={values.id}
                                disabled={true}
                            />
                        ) : null}
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={values.description}
                            disabled={loading}
                            error={errors.description && touched.description}
                            helperText={
                                errors.description &&
                                touched.description &&
                                errors.description
                            }
                        />
                        <TextField
                            margin="dense"
                            id="location"
                            label="Location"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={values.location}
                            disabled={loading}
                            error={errors.location && touched.location}
                            helperText={
                                errors.location &&
                                touched.location &&
                                errors.location
                            }
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={values.name}
                            disabled={loading}
                            error={errors.name && touched.name}
                            helperText={
                                errors.name && touched.name && errors.name
                            }
                        />
                        <br />
                        <br />
                        <div>
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload file
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(e) => {
                                        setFile(e.currentTarget.files[0]);
                                    }}
                                />
                            </Button>
                            &nbsp;{file?.name}
                            <br />
                            <FormHelperText
                                error={file && file?.size > MAX_FILE_SIZE}
                            >
                                {file && file?.size > MAX_FILE_SIZE
                                    ? 'File size has exceed 2mb restriction'
                                    : ''}
                            </FormHelperText>
                            {data?.logo ? (
                                <>
                                    <br />
                                    <ImageCallRenderer data={data} />
                                </>
                            ) : null}
                        </div>
                        <Grid container justifyContent="flex-end" marginTop={2}>
                            <Button
                                onClick={() => handleClose(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            &nbsp;
                            <Button type="submit" disabled={loading}>
                                Save
                            </Button>
                        </Grid>
                    </form>
                );
            }}
        </Formik>
    );
}
