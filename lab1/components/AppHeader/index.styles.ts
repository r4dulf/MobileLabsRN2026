import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logoContainer: {
    flexDirection: 'column',
  },
  logoLine1: {
    fontSize: 9,
    fontWeight: '800',
    color: '#cc2200',
    letterSpacing: 0.5,
  },
  logoLine2: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1a3a6b',
    letterSpacing: 0.5,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
