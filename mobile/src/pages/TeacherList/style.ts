import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7'
  },
  teacherList: {
    marginTop: -40,
  },
  searchForm: {
    marginBottom: 24,
  },
  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular',
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputBlock: {
    width: '48%'
  },
  input: {
    height: 54,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16
  },
  pickerWrapper: {
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    marginTop: 4,
    marginBottom: 16
  },
  picker: {
    height: 54,
    justifyContent: 'center',
    color: '#c1bccc'
  },
  submitButton: {
    backgroundColor: '#04d361',
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
  },
  submitButtonText: {
    color: '#ffffff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  }
})

export default styles