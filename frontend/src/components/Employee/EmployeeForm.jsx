import {
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const EmployeeSchema = Yup.object().shape({
    name: Yup.string().min(6).max(10).required('Required'),
    email_address: Yup.string()
        .email('email address must be a valid email')
        .required('Required'),
    phone_number: Yup.string()
        .required('Required')
        .max(8)
        .matches(
            new RegExp('^(9|8)[0-9]{0,7}$'),
            'phone number should starts with 8 or 9, and have 8 digits'
        ),
    gender: Yup.string().required('Required'),
    cafe: Yup.string()
});

EmployeeForm.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    handleCreateFn: PropTypes.func,
    handleUpdateFn: PropTypes.func,
    handleClose: PropTypes.func.isRequired,
    cafes: PropTypes.array
};

function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i)
        result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

function handleFilterCafe(cafes, values) {
    const filteredCafe = cafes.filter((cafe) => cafe.name === values.cafe)[0];
    values.cafe = {
        id: filteredCafe.id,
        name: filteredCafe.name,
        start_date: new Date().getTime()
    };
}

export default function EmployeeForm({
    data,
    loading,
    handleCreateFn,
    handleUpdateFn,
    handleClose,
    cafes
}) {
    return (
        <Formik
            initialValues={{
                id: data?.id || `UI${randomString(7, 'A#')}`,
                name: data?.name || '',
                email_address: data?.email_address || '',
                phone_number: data?.phone_number || '',
                gender: data?.gender || '',
                cafe: data?.cafe || ''
            }}
            validationSchema={EmployeeSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSubmitting(false);
                    if (data?.id) {
                        if (values.cafe) {
                            handleFilterCafe(cafes, values);
                        } else {
                            delete values.cafe;
                        }

                        handleUpdateFn(data?.id, values);
                        handleClose(false);
                    } else {
                        if (values.cafe) {
                            handleFilterCafe(cafes, values);
                        } else {
                            delete values.cafe;
                        }

                        handleCreateFn(values);
                        handleClose(false);
                    }
                }, 400);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
            }) => {
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
                            onBlur={handleBlur}
                        />
                        <TextField
                            margin="dense"
                            id="email_address"
                            label="Email Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={values.email_address}
                            disabled={loading}
                            error={
                                errors.email_address && touched.email_address
                            }
                            helperText={
                                errors.email_address &&
                                touched.email_address &&
                                errors.email_address
                            }
                            onBlur={handleBlur}
                        />
                        <TextField
                            margin="dense"
                            id="phone_number"
                            label="Phone Number"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={values.phone_number}
                            disabled={loading}
                            error={errors.phone_number && touched.phone_number}
                            helperText={
                                errors.phone_number &&
                                touched.phone_number &&
                                errors.phone_number
                            }
                            onBlur={handleBlur}
                        />
                        <br />
                        <h5>Gender</h5>
                        <RadioGroup
                            id="gender"
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                            disabled={loading}
                            onBlur={handleBlur}
                        >
                            <FormControlLabel
                                value="Male"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                value="Female"
                                control={<Radio />}
                                label="Female"
                            />
                        </RadioGroup>
                        <FormHelperText error={errors.gender && touched.gender}>
                            {errors.gender && touched.gender && errors.gender}
                        </FormHelperText>
                        <br />
                        <h5>Assigned Café</h5>
                        <Select
                            id="cafe"
                            name="cafe"
                            fullWidth
                            value={values.cafe}
                            label="Assigned Café"
                            onChange={handleChange}
                            disabled={loading}
                        >
                            {cafes
                                ? cafes.map((cafe, i) => {
                                      return (
                                          <MenuItem
                                              value={cafe.name}
                                              selected={
                                                  cafe.name === data?.cafe
                                              }
                                              key={i}
                                          >
                                              {cafe.name}
                                          </MenuItem>
                                      );
                                  })
                                : null}
                        </Select>
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
