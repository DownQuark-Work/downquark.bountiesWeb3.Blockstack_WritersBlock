import dataUri from './datauri/index'

export const TabletPlusCorners = {
              ALL: {
                background: '#fff',
                borderTopLeftRadius: '25%',
                borderTopRightRadius: '25%',
                borderBottomRightRadius: '25%',
                borderBottomLeftRadius: '25%',
                content: '""',
                height: '2em',
                position: 'absolute',
                width: 'calc(50% + 2em)',
                zIndex:-1 },
              HB:{
                borderTopLeftRadius: 0,
                right: '50%',
                transform: 'rotate(-2deg)',
              },//header before
              H:{
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                top: '-2.65em',
              },//header both
              HA:{
                borderTopRightRadius: 0,
                left: '50%',
                transform: 'rotate(2deg)',
              },//header after
              FB:{
                borderBottomLeftRadius: 0,
                right: '50%',
                transform: 'rotate(2deg)',
              },//Footer before
              F:{
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                bottom: '-2.65em',
              },//Footer both
              FA:{
                borderBottomRightRadius: 0,
                left: '50%',
                transform: 'rotate(-2deg)',
              },//Footer after
            }

  // ARRAYS below allow us to have multiple options in the future
export const DataUri:ObjOfArrayStr = dataUri