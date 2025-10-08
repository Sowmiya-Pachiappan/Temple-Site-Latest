import 'react-international-phone/style.css';
import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';

export const MuiPhone = ({
  value,
  onChange,
  ...restProps
}) => {
  const {
    inputValue,
    handlePhoneValueChange,
    inputRef,
    country,
    setCountry,
  } = usePhoneInput({
    defaultCountry: 'in',
    value,
    countries: defaultCountries,
    onChange: (data) => {
      const mobileCode = `+${data.country.dialCode}`;
      const mobileNumber = data.phone
        .replace(mobileCode, '')
        .trim();

      onChange({
        fullPhone: data.phone,
        mobileCode,
        mobileNumber,
      });
    },
  });

  return (
    <TextField
      name='mobile'
      variant='outlined'
      label='Phone number'
      color='primary'
      placeholder='Phone number'
      value={inputValue}
      onChange={handlePhoneValueChange}
      type='tel'
      inputRef={inputRef}
      className='w-full'
      InputProps={{
        startAdornment: (
          <InputAdornment
            position='start'
            style={{
              marginRight: '2px',
              marginLeft: '-8px',
            }}
          >
            <Select
              MenuProps={{
                style: {
                  height: '300px',
                  width: '360px',
                  top: '10px',
                  left: '-34px',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              sx={{
                width: 'max-content',
                fieldset: { display: 'none' },
                '&.Mui-focused:has(div[aria-expanded="false"])':
                  {
                    fieldset: { display: 'block' },
                  },
                '.MuiSelect-select': {
                  padding: '8px',
                  paddingRight: '24px !important',
                },
                svg: {
                  right: 0,
                },
              }}
              value={country.iso2}
              onChange={(e) => setCountry(e.target.value)}
              renderValue={(value) => (
                <FlagImage
                  iso2={value}
                  style={{ display: 'flex' }}
                />
              )}
            >
              {defaultCountries.map((c) => {
                const country = parseCountry(c);
                return (
                  <MenuItem
                    key={country.iso2}
                    value={country.iso2}
                  >
                    <FlagImage
                      iso2={country.iso2}
                      style={{ marginRight: '8px' }}
                    />
                    <Typography marginRight='8px'>
                      {country.name}
                    </Typography>
                    <Typography color='gray'>
                      +{country.dialCode}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
};
