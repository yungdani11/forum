// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom';
// import { Button, ButtonGroup } from '@chakra-ui/react';
// import validationSchema from '../password/validationSchema';

// interface Address {
//   name: string;
//   country: string;
//   city: string;
//   street: string;
//   zip: string;
// }

// interface FormValues {
//   username: string;
//   password: string;
//   passwordConfirm: string;
//   firstName: string;
//   lastName: string;
//   homeAddress: Address;
//   notificationAddress: Address;
// }

// const RegistrationForm: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [sameAsHomeAddress, setSameAsHomeAddress] = useState(false);
//   const navigate = useNavigate();

//   const formik = useFormik<FormValues>({
//     initialValues: {
//       username: '',
//       password: '',
//       passwordConfirm: '',
//       firstName: '',
//       lastName: '',
//       homeAddress: {
//         name: '',
//         country: '',
//         city: '',
//         street: '',
//         zip: '',
//       },
//       notificationAddress: {
//         name: '',
//         country: '',
//         city: '',
//         street: '',
//         zip: '',
//       },
//     },
//     validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       setError(null);
//       setSuccess(null);
//       try {
//         const response = await fetch('http://localhost:5000/user', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(values),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setSuccess('Sikeres regisztráció!');
//           resetForm();
//           setTimeout(() => {
//             navigate('/login');
//           }, 3000);
//         } else {
//           const errorData = await response.json();
//           switch (response.status) {
//             case 400:
//               throw new Error(errorData.message || 'A bevitt adatok érvénytelenek.');
//             case 409:
//               throw new Error(errorData.message || 'A felhasználó már létezik.');
//             default:
//               throw new Error(errorData.message || 'Ismeretlen hiba történt.');
//           }
//         }
//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError('Ismeretlen hiba történt.');
//         }
//       }
//     },
//   });

//   useEffect(() => {
//     if (sameAsHomeAddress) {
//       formik.setFieldValue('notificationAddress', formik.values.homeAddress);
//     } else {
//       formik.setFieldValue('notificationAddress', {
//         name: '',
//         country: '',
//         city: '',
//         street: '',
//         zip: '',
//       });
//     }
//   }, [sameAsHomeAddress]);

//   return (
//     <div style={{ maxWidth: '400px', maxHeight: '80vh', overflowY: 'auto', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
//       <h2 style={{ textAlign: 'center' }}>Regisztrációs űrlap</h2>
//       <form onSubmit={formik.handleSubmit}>
//         {/* username input */}
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="email"
//             name="username"
//             placeholder="Felhasználónév"
//             value={formik.values.username}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//           />
//           {formik.touched.username && formik.errors.username && (
//             <div style={{ color: 'red' }}>{formik.errors.username}</div>
//           )}
//         </div>

//         {/* password input */}
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="password"
//             name="password"
//             placeholder="Jelszó"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <div style={{ color: 'red' }}>{formik.errors.password}</div>
//           )}
//         </div>

//         {/* passwordConfirm input */}
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="password"
//             name="passwordConfirm"
//             placeholder="Jelszó megerősítése"
//             value={formik.values.passwordConfirm}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//           />
//           {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
//             <div style={{ color: 'red' }}>{formik.errors.passwordConfirm}</div>
//           )}
//         </div>

//         {/* firstName input */}
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="firstName"
//             placeholder="Keresztnév"
//             value={formik.values.firstName}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//           />
//           {formik.touched.firstName && formik.errors.firstName && (
//             <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
//           )}
//         </div>

//         {/* lastName input */}
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Vezetéknév"
//             value={formik.values.lastName}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//           />
//           {formik.touched.lastName && formik.errors.lastName && (
//             <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
//           )}
//         </div>

//         <h3>Otthoni cím</h3>
//         {/* homeAddress inputs */}
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="homeAddress.name"
//             placeholder="Név"
//             value={formik.values.homeAddress.name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//           />
//           {formik.touched.homeAddress?.name && formik.errors.homeAddress?.name && (
//             <div style={{ color: 'red' }}>{formik.errors.homeAddress.name}</div>
//           )}
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="homeAddress.country"
//             placeholder="Ország"
//             value={formik.values.homeAddress.country}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//           />
//           {formik.touched.homeAddress?.country && formik.errors.homeAddress?.country && (
//             <div style={{ color: 'red' }}>{formik.errors.homeAddress.country}</div>
//           )}
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="homeAddress.city"
//             placeholder="Város"
//             value={formik.values.homeAddress.city}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//           />
//           {formik.touched.homeAddress?.city && formik.errors.homeAddress?.city && (
//             <div style={{ color: 'red' }}>{formik.errors.homeAddress.city}</div>
//           )}
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="homeAddress.street"
//             placeholder="Utca, házszám"
//             value={formik.values.homeAddress.street}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//           />
//           {formik.touched.homeAddress?.street && formik.errors.homeAddress?.street && (
//             <div style={{ color: 'red' }}>{formik.errors.homeAddress.street}</div>
//           )}
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="homeAddress.zip"
//             placeholder="Irányítószám"
//             value={formik.values.homeAddress.zip}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//           />
//           {formik.touched.homeAddress?.zip && formik.errors.homeAddress?.zip && (
//             <div style={{ color: 'red' }}>{formik.errors.homeAddress.zip}</div>
//           )}
//         </div>

//         <label>
//           <input
//             type="checkbox"
//             checked={sameAsHomeAddress}
//             onChange={(e) => setSameAsHomeAddress(e.target.checked)}
//           />
//           Az értesítési cím megegyezik a lakcímmel
//         </label>

//         <h3>Értesítési cím</h3>
//         {/* notificationAddress inputs */}
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="notificationAddress.name"
//             placeholder="Név"
//             value={formik.values.notificationAddress.name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             disabled={sameAsHomeAddress}
//             style={{
//               width: '100%',
//               padding: '10px',
//               borderRadius: '5px',
//               border: '1px solid #ccc',
//               backgroundColor: sameAsHomeAddress ? '#f0f0f0' : 'white'
//             }}
//           />
//           {formik.touched.notificationAddress?.name && formik.errors.notificationAddress?.name && (
//             <div style={{ color: 'red' }}>{formik.errors.notificationAddress.name}</div>
//           )}
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="notificationAddress.country"
//             placeholder="Ország"
//             value={formik.values.notificationAddress.country}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             disabled={sameAsHomeAddress}
//             style={{
//               width: '100%',
//               padding: '10px',
//               borderRadius: '5px',
//               border: '1px solid #ccc',
//               backgroundColor: sameAsHomeAddress ? '#f0f0f0' : 'white'
//             }}
//           />
//           {formik.touched.notificationAddress?.country && formik.errors.notificationAddress?.country && (
//             <div style={{ color: 'red' }}>{formik.errors.notificationAddress.country}</div>
//           )}
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="notificationAddress.city"
//             placeholder="Város"
//             value={formik.values.notificationAddress.city}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             disabled={sameAsHomeAddress}
//             style={{
//               width: '100%',
//               padding: '10px',
//               borderRadius: '5px',
//               border: '1px solid #ccc',
//               backgroundColor: sameAsHomeAddress ? '#f0f0f0' : 'white'
//             }}
//           />
//           {formik.touched.notificationAddress?.city && formik.errors.notificationAddress?.city && (
//             <div style={{ color: 'red' }}>{formik.errors.notificationAddress.city}</div>
//           )}
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="notificationAddress.street"
//             placeholder="Utca, házszám"
//             value={formik.values.notificationAddress.street}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             disabled={sameAsHomeAddress}
//             style={{
//               width: '100%',
//               padding: '10px',
//               borderRadius: '5px',
//               border: '1px solid #ccc',
//               backgroundColor: sameAsHomeAddress ? '#f0f0f0' : 'white'
//             }}
//           />
//           {formik.touched.notificationAddress?.street && formik.errors.notificationAddress?.street && (
//             <div style={{ color: 'red' }}>{formik.errors.notificationAddress.street}</div>
//           )}
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <input
//             type="text"
//             name="notificationAddress.zip"
//             placeholder="Irányítószám"
//             value={formik.values.notificationAddress.zip}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             disabled={sameAsHomeAddress}
//             style={{
//               width: '100%',
//               padding: '10px',
//               borderRadius: '5px',
//               border: '1px solid #ccc',
//               backgroundColor: sameAsHomeAddress ? '#f0f0f0' : 'white'
//             }}
//           />
//           {formik.touched.notificationAddress?.zip && formik.errors.notificationAddress?.zip && (
//             <div style={{ color: 'red' }}>{formik.errors.notificationAddress.zip}</div>
//           )}
//         </div>

//         {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
//         {success && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{success}</p>}
//         <ButtonGroup>
//           <Button type="submit" colorScheme="green" width="100%" isDisabled={!formik.isValid || formik.isSubmitting}>
//             Regisztráció
//           </Button>
//           <Button type="button" colorScheme="red" width="100%" onClick={() => formik.resetForm()}>
//             Mégsem
//           </Button>
//         </ButtonGroup>
//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;


// export default RegistrationForm; EZ EDDIG A LEGJOBB VÁLTOZAT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import React from 'react';
// import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
// import {
//   FormControl,
//   FormLabel,
//   Input,
//   FormErrorMessage,
//   Box,
// } from '@chakra-ui/react';

// // Validációs séma
// const validationSchema = Yup.object({
//   username: Yup.string()
//     .email('Érvénytelen email cím')
//     .required('Kötelező kitölteni'),
//   password: Yup.string()
//     .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie')
//     .matches(/[0-9]/, 'A jelszónak tartalmaznia kell legalább 1 számot')
//     .matches(/[a-z]/, 'A jelszónak tartalmaznia kell legalább 1 kisbetűt')
//     .required('Kötelező kitölteni'),
//   passwordConfirm: Yup.string()
//     .oneOf([Yup.ref('password')], 'A jelszavaknak meg kell egyezniük')
//     .required('Kötelező kitölteni'),
//   lastname: Yup.string()
//     .required('Kötelező kitölteni'),
//   firstname: Yup.string()
//     .required('Kötelező kitölteni'),
// });

// interface FormValues {
//   username: string;
//   password: string;
//   passwordConfirm: string;
//   lastname: string;
//   firstname: string;
// }

// const RegistrationForm: React.FC = () => {
//   const navigate = useNavigate();

//   const formik = useFormik<FormValues>({
//     initialValues: {
//       username: '',
//       password: '',
//       passwordConfirm: '',
//       lastname: '',
//       firstname: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//       // Például navigálhatsz egy másik oldalra sikeres regisztráció után:
//       navigate('/login');
//     },
//   });

//   return (
//     <Box width="400px" margin="0 auto" mt="50px">
//       <form onSubmit={formik.handleSubmit}>
//         <FormControl isInvalid={!!formik.errors.username && formik.touched.username}>
//           <FormLabel htmlFor="username">Email cím</FormLabel>
//           <Input
//             id="username"
//             name="username"
//             type="email"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.username}
//           />
//           <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
//         </FormControl>

//         <FormControl mt={4} isInvalid={!!formik.errors.password && formik.touched.password}>
//           <FormLabel htmlFor="password">Jelszó</FormLabel>
//           <Input
//             id="password"
//             name="password"
//             type="password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.password}
//           />
//           <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
//         </FormControl>

//         <FormControl mt={4} isInvalid={!!formik.errors.passwordConfirm && formik.touched.passwordConfirm}>
//           <FormLabel htmlFor="passwordConfirm">Jelszó megerősítése</FormLabel>
//           <Input
//             id="passwordConfirm"
//             name="passwordConfirm"
//             type="password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.passwordConfirm}
//           />
//           <FormErrorMessage>{formik.errors.passwordConfirm}</FormErrorMessage>
//         </FormControl>

//         <FormControl mt={4} isInvalid={!!formik.errors.lastname && formik.touched.lastname}>
//           <FormLabel htmlFor="lastname">Vezetéknév</FormLabel>
//           <Input
//             id="lastname"
//             name="lastname"
//             type="text"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.lastname}
//           />
//           <FormErrorMessage>{formik.errors.lastname}</FormErrorMessage>
//         </FormControl>

//         <FormControl mt={4} isInvalid={!!formik.errors.firstname && formik.touched.firstname}>
//           <FormLabel htmlFor="firstname">Keresztnév</FormLabel>
//           <Input
//             id="firstname"
//             name="firstname"
//             type="text"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.firstname}
//           />
//           <FormErrorMessage>{formik.errors.firstname}</FormErrorMessage>
//         </FormControl>

//         <button
//           type="button"
//           onClick={formik.handleReset}
//           disabled={!formik.isValid || formik.isSubmitting}
//           style={{ marginRight: '10px' }}
//         >
//           Reset
//         </button>

//         <button
//           type="submit"
//           disabled={!formik.isValid || formik.isSubmitting}
//           style={{ marginRight: '10px' }}
//         >
//           Regisztráció
//         </button>
//       </form>
//     </Box>
//   );
// };

// export default RegistrationForm;


import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Alert, AlertIcon, useToast } from '@chakra-ui/react';
import * as Yup from 'yup';

interface FormValues {
  username: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

const validationSchema = Yup.object({
  username: Yup.string().email('Érvényes email címet kell megadni').required('Kötelező kitölteni'),
  password: Yup.string()
    .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie')
    .matches(/[0-9]/, 'Legalább 1 számot kell tartalmaznia')
    .matches(/[a-z]/, 'Legalább 1 kisbetűt kell tartalmaznia')
    .required('Kötelező kitölteni'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'A jelszó nem egyezik')
    .required('Kötelező kitölteni'),
  firstName: Yup.string().required('Kötelező kitölteni'),
  lastName: Yup.string().required('Kötelező kitölteni'),
});

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const formik = useFormik<FormValues>({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast({
            title: 'Sikeres regisztráció!',
            description: 'Most már bejelentkezhet.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          resetForm();
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Ismeretlen hiba történt.');
        }
      } catch (error) {
        toast({
          title: 'Hiba',
          description: error instanceof Error ? error.message : 'Ismeretlen hiba történt.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <Box w="100%" maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md" bg="white">
      <Heading mb={6} textAlign="center">Regisztráció</Heading>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4}>
          {[
            { name: 'username', type: 'email', label: 'Email cím' },
            { name: 'password', type: 'password', label: 'Jelszó' },
            { name: 'passwordConfirm', type: 'password', label: 'Jelszó megerősítése' },
            { name: 'firstName', type: 'text', label: 'Keresztnév' },
            { name: 'lastName', type: 'text', label: 'Vezetéknév' },
          ].map(({ name, type, label }) => (
            <FormControl key={name} isInvalid={formik.touched[name as keyof FormValues] && !!formik.errors[name as keyof FormValues]}>
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <Input
                id={name}
                name={name}
                type={type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name as keyof FormValues]}
              />
              {formik.touched[name as keyof FormValues] && formik.errors[name as keyof FormValues] && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  {formik.errors[name as keyof FormValues]}
                </Alert>
              )}
            </FormControl>
          ))}
          <Button colorScheme="teal" type="submit" width="100%" isDisabled={!formik.isValid || formik.isSubmitting}>
            Regisztráció
          </Button>
          <Button colorScheme="gray" type="button" width="100%" onClick={() => formik.resetForm()}>
            Mégsem
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
